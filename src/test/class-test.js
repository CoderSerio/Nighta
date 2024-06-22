const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
      (block
        (class Person null
          (block
            (fun constructor (x y)
              (block
                (say "constructor!")
                (= (prop self x) x)
                (= (prop self y) y)
              )
            )
            (fun sum ()
              (block
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

  parser.parseTest(
    `
      (block
        (class Person null
          (block
            (fun constructor (x)
              (= (prop self x) x)
            )
          )
        )

        (var person1 (new Person 1))
        (var person2 (new Person 2))
        (say (prop person1 x))
        (say (prop person2 x))
        (say (prop person1 x))
        (= (prop person1 x) 3)
        (say (prop person1 x))        
        (say (prop person2 x))        
      )
    `
  );

  // Individual instance and its property 
  parser.parseTest(
    `
      (block
        (class Person null
          (block
            (fun constructor (x)
              (= (prop self x) x)
            )

            (fun info () 
              (say (prop self x))
            )
          )
        )
        (say "-----")
        (var person1 (new Person 1))
        (var person2 (new Person 2))
        ((prop person1 info))
        ((prop person2 info))
      )
    `
  );

  // 
  parser.parseTest(
    `
      (block
        (class Person null
          (block
            (fun constructor (x)
              (= (prop self x) x)
            )

            (fun info () 
              (say (+ "This is OOP: " x))
            )
          )
        )

        (class Worker Person
          (block
            (fun constructor () 
              (block
                (info)
              )
            )
          )  
        )

        (new Worker 10)
      )
    `
  );
};