const assert = require('assert');

module.exports = (nighta) => {
  assert.strictEqual(nighta.eval(
    ['begin',
      ['var', 'x', 10],
      ['var', 'y', 10],
      ['if',
        ['>=', 'x', 1],
        ['set', 'y', 1],
        ['set', 'y', 2],
      ],
      'y'
    ]
  ), 1);
};