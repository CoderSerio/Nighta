const Environment = require("../environment/Environment");
const Transformer = require("./transformer/Transformer");

class Nighta {
  constructor(global = new Environment(), parent = null) {
    this.global = global;
    this.parent = parent;
    this.transformer = new Transformer();
  }

  eval(exp, env = this.global) {
    // console.log('======================================');
    // console.log(exp);
    // console.log('____');
    // console.log(env);
    // console.log('======================================');
    if (this._isNumber(exp)) {
      return exp;
    }

    if (this._isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === 'begin') {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    if (exp[0] === 'var') {
      const [_tag, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    if (exp[0] === 'set') {
      const [_tag, target, originalValue] = exp;
      const value = this.eval(originalValue, env);
      // If the target is a class
      if (target[0] === 'prop') {
        const [_tag, instanceName, propertyName] = target;
        const instanceEnv = this.eval(instanceName, env);
        // Why not `assign`? --- `assign` is used to change the variable in self and parent scope.
        // In a class, we use keyword `set` to create a variable so we use define here.
        return instanceEnv.define(propertyName, value);
      }
      return env.assign(target, value);
    }

    if (exp[0] === 'if') {
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
    }

    if (exp[0] === 'switch') {
      const ifExp = this.transformer.transformSwitch(exp);
      return this.eval(ifExp, env);
    }

    if (exp[0] === 'while') {
      const [_tag, condition, body] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }
      return result;
    }

    if (exp[0] === 'fun') {
      if (exp.length === 4) { // normal function
        const [_tag, name, params, body] = exp;
        return env.define(name, {
          params,
          body,
          env
        });
      } else { // lambda function
        const [_tag, params, body] = exp;
        return {
          params,
          body,
          env
        };
      }
    }

    if (exp[0] === 'class') {
      const [_tag, className, parent, body] = exp;
      const parentClassEnv = this.eval(parent, env); // maybe null
      const record = {};


      // Class is a kind of environment, which has a individual scope
      // And its parent would be replaced with global environment if it is null
      // super: parentClassEnv
      const classEnv = new Environment({ _className: className }, parentClassEnv || env);
      if (parentClassEnv) {
        Object.keys(parentClassEnv.record).forEach((key) => {
          const parentRecordValue = parentClassEnv.record[key];
          const recordValue = classEnv.record[key];
          let value;
          if (key === 'constructor') {
            value = {
              params: [...parentRecordValue.params, recordValue.params],
              body: [...parentRecordValue.body, recordValue.body],
              env: parentClassEnv
            };
            classEnv.define(key, value);
          } else {
            value = recordValue ?? parentRecordValue;
          }
          classEnv.define(key, value);
        });
      }

      this._evalFunctionBody(body, classEnv);
      return env.define(className, classEnv);
    }

    if (exp[0] === 'new') {
      const [_tag, className, ...originalArgs] = exp;
      const classEnv = this.eval(className, env);
      // As the same, instance of a class is also a kind of environment, and its parent is the class
      const instanceEnv = new Environment({}, classEnv);
      instanceEnv.define('self', instanceEnv);
      const instanceRecord = { ...classEnv.parent?.record, ...classEnv.record };
      Object.keys(instanceRecord).forEach((key) => {
        const originalValue = instanceRecord[key];
        let value;
        // In our AST, function is processed to a kind of object
        if (originalValue instanceof Object) {
          value = { ...originalValue };
          if (value.env) {
            value.env = instanceEnv;
          }
        } else {
          value = originalValue;
        }

        instanceEnv.define(key, value);
      });

      const constructor = instanceEnv.lookUp('constructor');
      const args = originalArgs.map((arg) => this.eval(arg, env));
      // TODO: there would be a overwrite if variable name is `self`
      this._callUserDefinedFunction(constructor, args, instanceEnv);
      return instanceEnv;
    }

    if (exp[0] === 'prop') {
      const [_tag, instanceName, propertyName] = exp;
      const instanceEnv = this.eval(instanceName, env);
      return instanceEnv.lookUp(propertyName);
    }

    if (exp[0] === 'super') {
      const [_tag, className] = exp;
      const classEnv = this.eval(className, env);
      return classEnv.parent;
    }

    if (this._isVariableName(exp)) {
      return env.lookUp(exp);
    }

    // Function Call:
    if (Array.isArray(exp)) {
      const [name, ...originalArgs] = exp;
      const fn = this.eval(name, env);
      const args = originalArgs.map((arg) => this.eval(arg, env));

      if (typeof fn === 'function') { // build-in functions
        return fn(...args);
      } else if (fn.body && fn.env) { // user-defined functions
        return this._callUserDefinedFunction(fn, args, fn.env);
      }
    }

    throw `Unimplemented Syntax: ${JSON.stringify(exp)}`;
  }

  _callUserDefinedFunction(fn, args, env) {
    // copy the prams
    const activationRecord = {};
    fn.params?.forEach((param, index) => {
      activationRecord[param] = args[index];
    });

    const activationEnvironment = new Environment(
      activationRecord,
      env
    );

    return this._evalFunctionBody(fn.body, activationEnvironment);
  }

  _evalFunctionBody(body, env) {
    // avoid handling the blocks in a function incorrectly
    if (body[0] === 'begin') {
      return this._evalBlock(body, env);
    }
    return this.eval(body, env);
  }

  _evalBlock(block, env) {
    let result;
    const [_tag, ...expressions] = block;
    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }

  _isNumber(exp) {
    return typeof exp === 'number';
  }

  _isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
  }

  _isVariableName(exp) {
    return typeof exp === 'string' && (/^[+\-*/<>=a-zA-Z0-9_]*$/.test(exp));
  }
}

const nighta = new Nighta(new Environment({
  null: null,
  true: true,
  false: false,
  undefined: undefined,
  '+': (v1, v2) => v1 + v2,
  '-': (v1, v2) => v1 - v2,
  '*': (v1, v2) => v1 * v2,
  '/': (v1, v2) => v1 / v2,
  '%': (v1, v2) => v1 % v2,
  '>': (v1, v2) => v1 > v2,
  '>=': (v1, v2) => v1 >= v2,
  '=': (v1, v2) => v1 === v2,
  '<=': (v1, v2) => v1 <= v2,
  '<': (v1, v2) => v1 < v2,
  say: (...args) => { console.log(...args); },
}));


module.exports = nighta;