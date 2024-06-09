const assert = require("assert");

class Nighta {
  eval(exp) {
    if (isNumber(exp)) {
      return exp;
    }

    throw 'Unimplemented';
  }
}

function isNumber(exp) {
  return typeof exp === 'number';
}

const nighta = new Nighta();
assert.strictEqual(nighta.eval(1), 1);
console.log('All Assertions Passed!');