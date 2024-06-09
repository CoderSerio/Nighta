const assert = require("assert");

module.exports = (nighta) => {
  assert.strictEqual(nighta.eval(1), 1);
  assert.strictEqual(nighta.eval('"Hello"'), 'Hello');
};