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
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === '+') {
      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    if (exp[0] === '*') {
      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    if (exp[0] === '-') {
      return this.eval(exp[1], env) - this.eval(exp[2], env);
    }

    if (exp[0] === '/') {
      return this.eval(exp[1], env) / this.eval(exp[2], env);
    }

    if (exp[0] === '>') {
      return this.eval(exp[1], env) > this.eval(exp[2], env);
    }

    if (exp[0] === '>=') {
      return this.eval(exp[1], env) >= this.eval(exp[2], env);
    }

    if (exp[0] === '=') {
      return this.eval(exp[1], env) === this.eval(exp[2], env);
    }

    if (exp[0] === '<=') {
      return this.eval(exp[1], env) <= this.eval(exp[2], env);
    }

    if (exp[0] === '<') {
      return this.eval(exp[1], env) < this.eval(exp[2], env);
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

    if (isVariableName(exp)) {
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

    throw `Unimplemented Syntax: ${JSON.stringify(exp)}`;
  }

  _evalBlock(block, env) {
    let result;
    const [_, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
  return typeof exp === 'string' && (/^[a-zA-Z][a-zA-Z0-9]*$/.test(exp));
}

module.exports = Nighta;