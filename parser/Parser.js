const assert = require('assert');
const grammar = require('./grammar');

class Parser {
  constructor(nighta,) {
    this.nighta = nighta;
  }

  parse(code) {
    const exp = grammar.parse(code);
    return exp;
  }

  parseTest(code, expected) {
    const exp = this.parse(code);
    const res = this.nighta.eval(exp);
    assert.strictEqual(res, expected);
  }
}

module.exports = Parser;