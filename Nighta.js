const assert = require("assert");
const Environment = require("./Environment");
const { default: test } = require("node:test");


class Nighta {
  constructor(global = new Environment()) {
    this.global = global;
  }

  eval(exp, env = this.global) {
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === '+') {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }

    if (exp[0] === '*') {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }

    if (exp[0] === '-') {
      return this.eval(exp[1]) - this.eval(exp[2]);
    }

    if (exp[0] === '/') {
      return this.eval(exp[1]) / this.eval(exp[2]);
    }

    if (exp[0] === 'var') {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value));
    }

    if (isVariableName(exp)) {
      return env.lookUp(exp);
    }

    throw `Unimplemented Syntax: ${JSON.stringify(exp)}`;
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

const nighta = new Nighta(new Environment({
  null: null,
  true: true,
  false: false,
  undefined: undefined
}));

// Basic:
assert.strictEqual(nighta.eval(1), 1);
assert.strictEqual(nighta.eval('"Hello"'), 'Hello');

// Math:
assert.strictEqual(nighta.eval(['+', 1, 2]), 3);
assert.strictEqual(nighta.eval(['+', ['+', 2, 2], ['+', 3, 3]]), 10);
assert.strictEqual(nighta.eval(['*', 4, 10]), 40);
assert.strictEqual(nighta.eval(['*', ['*', 2, 10], 10]), 200);
assert.strictEqual(nighta.eval(['-', 4, 10]), -6);
assert.strictEqual(nighta.eval(['-', ['-', 10, -1], 10]), 1);
assert.strictEqual(nighta.eval(['/', 4, 10]), 0.4);
assert.strictEqual(nighta.eval(['/', ['/', 10, 2], 10]), 0.5);

// Variables:
assert.strictEqual(nighta.eval(['var', 'x', 10]), 10);
assert.strictEqual(nighta.eval('x'), 10);

assert.strictEqual(nighta.eval(['var', 'y', '"aaa"']), 'aaa');
assert.strictEqual(nighta.eval('y'), 'aaa');

assert.strictEqual(nighta.eval(['var', 'z', 'true']), true);
assert.strictEqual(nighta.eval('z'), true);

assert.strictEqual(nighta.eval(['var', 'a', ['+', 1, 3]]), 4);
assert.strictEqual(nighta.eval('a'), 4);

console.log('All Assertions Passed!');