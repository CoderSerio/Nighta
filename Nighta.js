const Environment = require("./Environment");

class Nighta {
  constructor(global = new Environment(), parent = null) {
    this.global = global;
    this.parent = parent;
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
      const [_tag, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    if (this._isVariableName(exp)) {
      return env.lookUp(exp);
    }

    if (exp[0] === 'if') {
      const [_tag, conditon, consequent, alternate] = exp;
      if (this.eval(conditon, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
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

    // Function Call:
    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env);
      const args = exp.slice(1).map((arg) => this.eval(arg, env));
      if (typeof fn === 'function') { // build-in functions
        return fn(...args);
      } else if (fn.body && fn.env) { // user-defined functions
        // copy the params
        const activationRecord = {};
        fn.params?.forEach((param, index) => {
          activationRecord[param] = args[index];
        });

        const activationEnvironment = new Environment(
          activationRecord,
          fn.env // static scope, where the function declared
        );

        return this._evalFunctionBody(fn.body, activationEnvironment);
      }
    }

    throw `Unimplemented Syntax: ${JSON.stringify(exp)}`;
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
  say: (...args) => { console.log(...args); }
}));


module.exports = nighta;