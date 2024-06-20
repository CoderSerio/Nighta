const assert = require("assert");
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  assert.strictEqual(nighta.eval(['+', 1, 2]), 3);
  assert.strictEqual(nighta.eval(['+', ['+', 2, 2], ['+', 3, 3]]), 10);
  assert.strictEqual(nighta.eval(['*', 4, 10]), 40);
  assert.strictEqual(nighta.eval(['*', ['*', 2, 10], 10]), 200);
  assert.strictEqual(nighta.eval(['-', 4, 10]), -6);
  assert.strictEqual(nighta.eval(['-', ['-', 10, -1], 10]), 1);
  assert.strictEqual(nighta.eval(['/', 4, 10]), 0.4);
  assert.strictEqual(nighta.eval(['/', ['/', 10, 2], 10]), 0.5);
  parser.parseTest(
    `
    (begin
      (1 + (1 + 2))
    )
    `,
    4
  );
  parser.parseTest(
    `
    (begin
      (1 + (1 * 2))
    )
    `,
    3
  );
};