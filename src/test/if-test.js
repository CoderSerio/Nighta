const assert = require('assert');
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);

  parser.parseTest(
    `
    {
      (var x 100)
      (if (> x 100) 
        (say "x is bigger than 100")
        (if (< x 100) 
            (say "x is smaller than 100")
            (say "x is equal to 100")
        )
      )
    }
    `,
  );

  parser.parseTest(
    `
    {
      (var x 100)
      (if (> x 100) {
        (say "bigger")
      } {
        (say "smaller")
      })
    }
    `,
  );
};