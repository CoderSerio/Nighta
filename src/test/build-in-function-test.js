const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  new Parser(nighta).parseTest(
    `
    (begin
      (var msg1 "Hello,")
      (var msg2 "World!")
      (say (msg1 + msg2))
    )
    `,
  );
};