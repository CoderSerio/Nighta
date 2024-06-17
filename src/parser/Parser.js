const assert = require('assert');
const grammar = require('./grammar');

const EMPTY_EXPECTED = 'HERE_IS_NO_EXPECTED, WHY?';

class Parser {
  constructor(nighta,) {
    this.nighta = nighta;
  }

  parse(code) {
    const exp = grammar.parse(code);
    return exp;
  }

  parseTest(code, expected = EMPTY_EXPECTED) {
    const exp = this.parse(code);
    if (expected === EMPTY_EXPECTED) {
      assert.doesNotThrow(() => this.nighta.eval(exp));
    } else {
      assert.strictEqual(this.nighta.eval(exp), expected);
    }
  }
}

module.exports = Parser;