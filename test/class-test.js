const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
      (begin
        (class Person null
          (begin
            (fun constructor (x y)
              (begin
                (say "constructor!")
                (set (prop self x) x)
                (set (prop self y) y)
              )
            )
            (fun sum ()
              (begin
                (say self) 
                (var res 
                  (+ (prop self x) (prop self y)))
                (say (+ "The res is " res))
              )
            )
          )
        )

        (var person (new Person 10 20))
        ((prop person sum))
      )
    `
  );
};