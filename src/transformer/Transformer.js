class Transformer {
  transformSwitch(exp) {
    const [_tag, ...cases] = exp;
    /*
      the AST structure of if：
      [
        'if',
        ['>=', 'x', 1],
        ['set', 'y', 1],
        ['set', 'y', 2],
      ],
     */
    const ifAST = ['if', null, null, null];
    let current = ifAST;
    for (let i = 0; i < cases.length - 1; i++) {
      const [currentCondition, currentBlock] = cases[i];
      const [nextCondition, nextBlock] = cases[i + 1];

      current[1] = currentCondition;
      current[2] = currentBlock;
      if (nextCondition === 'default') {
        current[3] = nextBlock;
      } else {
        current[3] = ['if', null, null, null];
      }

      current = current[3];
    }
    return ifAST;
  }
}

module.exports = Transformer;