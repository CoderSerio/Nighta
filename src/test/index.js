const nighta = require('../Nighta');

const tests = [
  require('./eval-test'),
  require('./math-test'),
  require('./variable-test'),
  require('./block-test'),
  require('./while-test'),
  require('./build-in-function-test'),
  require('./if-test'),
  require('./user-defined-function-test'),
  require('./lambda-function-test'),
  require('./switch-test'),
  require('./class-test')
];

tests.forEach((test) => {
  test(nighta);
});

console.log('\n');
console.log('='.repeat(28));
console.log('✨ All Assertions Passed ✨');
console.log('='.repeat(28));
