const nighta = require('../Nighta');

const tests = [
  require('./eval-test'),
  require('./math-test'),
  require('./variable-test'),
  require('./block-test'),
  require('./if-test'),
  require('./while-test'),
  require('./build-in-function-test'),
  require('./user-defined-function-test'),
  require('./lambda-function-test'),
];

tests.forEach((test) => {
  test(nighta);
});

console.log('\n');
console.log('='.repeat(21));
console.log('All Assertions Passed');
console.log('='.repeat(21));
