const assert = require("assert");

class Nighta {
  eval(exp) {
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

    throw 'Unimplemented';
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

function isString(exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

const nighta = new Nighta();
assert.strictEqual(nighta.eval(1), 1);
assert.strictEqual(nighta.eval('"Hello"'), 'Hello');
assert.strictEqual(nighta.eval(['+', 1, 2]), 3);
assert.strictEqual(nighta.eval(['+', ['+', 2, 2], ['+', 3, 3]]), 10);
assert.strictEqual(nighta.eval(['*', 4, 10]), 40);
assert.strictEqual(nighta.eval(['*', ['*', 2, 10], 10]), 200);
assert.strictEqual(nighta.eval(['-', 4, 10]), -6);
assert.strictEqual(nighta.eval(['-', ['-', 10, -1], 10]), 1);
assert.strictEqual(nighta.eval(['/', 4, 10]), 0.4);
assert.strictEqual(nighta.eval(['/', ['/', 10, 2], 10]), 0.5);

console.log('All Assertions Passed!');