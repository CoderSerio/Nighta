const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
    (block
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
    (block
      (fun square (x y) 
        (block
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
    (block
      (fun calc (x y) 
        (block
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
    (block
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
    (block
      (fun sayMsg (msg)
        (block
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
    (block
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