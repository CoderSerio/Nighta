const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  new Parser(nighta).parseTest(
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
  new Parser(nighta).parseTest(
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
  new Parser(nighta).parseTest(
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
  new Parser(nighta).parseTest(
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
  new Parser(nighta).parseTest(
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
};