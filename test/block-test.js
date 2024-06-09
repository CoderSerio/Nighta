const assert = require("assert");

module.exports = (nighta) => {
  assert.strictEqual(nighta.eval(
    ['begin',
      ['var', 'x', 10],
      ['var', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ],
  ), 230);
  assert.strictEqual(nighta.eval(
    ['begin', +

      ['var', 'x', 10],
      ['begin',
        ['var', 'x', 20],
        'x'
      ],
      'x'
    ],
  ), 10);
  assert.strictEqual(nighta.eval(
    ['begin',
      ['var', 'x', 10],
      ['var', 'sum',
        ['begin',
          ['var', 'y', ['+', 'x', 20]],
          'y'
        ],
      ],
      'sum'
    ],
  ), 30);
  assert.strictEqual(nighta.eval(
    ['begin',
      ['var', 'x', 10],
      ['begin',
        ['set', 'x', ['+', 100, 900]],
      ],
      'x'
    ],
  ), 1000);

};