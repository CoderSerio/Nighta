const assert = require("assert");
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  // assert.doesNotThrow(() => nighta.eval(["say", '"Hello Nighta!"']));
  new Parser(nighta).parseTest(
    `
    (begin
      (var msg1 "Hello,")
      (var msg2 "World!")
      (say (+ msg1 msg2))
    )
    `,
  );
};