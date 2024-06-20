const assert = require('assert');
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  assert.strictEqual(nighta.eval(
    ['begin',
      ['var', 'x', 10],
      ['var', 'y', 10],
      ['if',
        ['>=', 'x', 1],
        ['=', 'y', 1],
        ['=', 'y', 2],
      ],
      'y'
    ]
  ), 1);

  parser.parseTest(
    `
    (begin
      (var x 100)
      (if (> x 100) 
        (say "x is bigger than 100")
        (if (< x 100) 
            (say "x is smaller than 100")
            (say "x is equal to 100")
        )
      )
    )
    `,
  );
};