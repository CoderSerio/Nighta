const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
    (begin
      (fun square (x) 
        (* x x)
      )
      (var y (square 2))
      (say y)
    )
    `,
  );
  parser.parseTest(
    `
    (begin
      (fun square (x y) 
        (begin
          (var z 30)
          (* (+ x y) z)
        )
      )
      (square 10 2)
    )
    `,
    360
  );
  parser.parseTest(
    `
    (begin
      (fun calc (x y) 
        (begin
          (fun sum (a b) (+ a b))
          (sum x y)
        )
      )
      (calc 10 2)
    )
    `,
    12
  );
  parser.parseTest(
    `
    (begin
      (fun sum (a b) (+ a b))

      (fun calc (callback x y) 
        (callback x y)
      )

      (calc sum 10 2)
    )
    `,
    12
  );
  parser.parseTest(
    `
    (begin
      (fun sayMsg (msg)
        (begin
          (var str "Hi, ")
          (say (+ str msg))
        ) 
      )
      (sayMsg "Nightaaaa")
    )
    `,
  );
  // recursive
  parser.parseTest(
    `
    (begin
      (fun sum (x)
        (if (== x 1)
          (say "hi")
        ) 
      )

      (say (sum 1))
    )
    `,
  );
};