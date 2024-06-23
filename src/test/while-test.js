const assert = require('assert');
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);

  assert.strictEqual(nighta.eval([
    'block',
    ['var', 'counter', 0],
    ['var', 'result', 0],
    ['while',
      ['<=', 'counter', 10],
      ['block',
        ['result', '=', ['+', 'result', 'counter']],
        ['counter', '=', ['+', 'counter', 1]]
      ]
    ],
    'result'
  ]),
    55
  );

  parser.parse(`
    {
      (var i 0)
      (while (i < 10) {
        (i = (i + 1))
      })    
    }  
  `);
};