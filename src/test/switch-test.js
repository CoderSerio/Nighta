const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
    (begin
      (var x 100)
      (switch 
        ((> x 100) "bigger")
        ((< x 100) "smaller")
        (default "equal")
      )
    )
    `,
    "equal"
  );

  parser.parseTest(
    `
    (begin
      (var x 10)
      (switch 
        ((> x 100) "bigger")
        ((< x 100) "smaller")
        (default "equal")
      )
    )
    `,
    "smaller"
  );

  parser.parseTest(
    `
    (begin
      (var x 1000)
      (switch 
        ((> x 100) "bigger")
        ((< x 100) "smaller")
        (default "equal")
      )
    )
    `,
    "bigger"
  );
};