const assert = require("assert");
const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  assert.strictEqual(nighta.eval(
    ['block',
      ['var', 'x', 10],
      ['var', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ],
  ), 230);
  assert.strictEqual(nighta.eval(
    ['block',
      ['var', 'x', 10],
      ['block',
        ['var', 'x', 20],
        'x'
      ],
      'x'
    ],
  ), 10);
  assert.strictEqual(nighta.eval(
    ['block',
      ['var', 'x', 10],
      ['var', 'sum',
        ['block',
          ['var', 'y', ['+', 'x', 20]],
          'y'
        ],
      ],
      'sum'
    ],
  ), 30);
  assert.strictEqual(nighta.eval(
    ['block',
      ['var', 'x', 10],
      ['block',
        ['=', 'x', ['+', 100, 900]],
      ],
      'x'
    ],
  ), 1000);
  parser.parseTest(
    `
    {
      (var x 10)
      (var y "86")
      ((x * 10) + y)
    }
    `,
    "10086"
  );
  parser.parseTest(
    `
    {
      (var x 1)
      (var y "24")
      ((x * 10) + y)
    }
    `,
    "1024"
  );
};