const Nighta = require('../Nighta');
const Environment = require('../Environment');

const tests = [
  require('./eval-test'),
  require('./math-test'),
  require('./variable-test'),
  require('./block-test'),
  require('./if-test'),
  require('./while-test'),
];

const nighta = new Nighta(new Environment({
  null: null,
  true: true,
  false: false,
  undefined: undefined
}));

tests.forEach((test) => {
  test(nighta);
});

console.log('All Assertions Passed!');