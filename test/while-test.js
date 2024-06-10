const assert = require('assert');

module.exports = (nighta) => {
  assert.strictEqual(nighta.eval([
    'begin',
    ['var', 'counter', 0],
    ['var', 'result', 0],
    ['while',
      ['<=', 'counter', 10],
      ['begin',
        ['set', 'result', ['+', 'result', 'counter']],
        ['set', 'counter', ['+', 'counter', 1]]
      ]
    ],
    'result'
  ]),
    55
  );
};