const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
      (block
        (class Person null {
            (fun sum () {
                (var res 
                  (self["x"] + self["y"])
                  (say "The res is " res)
                )
              }
            )
            (fun constructor (x y) {
                (say "constructor!")
                (self["x"] = x)
                (self["y"] = y)
                (self["sum"] = sum)
              }
            )  
          }
        )

        (var person (new Person 10 20))
        (say "??????????????????")
        (say person)
        (say "??????????????????")
      )
    `
  );

  parser.parseTest(
    `
      (block
        (class Person null
          (block
            (fun constructor (x)
              (self["x"] = x)
            )
          )
        )

        (var person1 (new Person 1))
        (var person2 (new Person 2))
        (say person1["x"])
        (say person2["x"])
        (say person1["x"])
        (person1["x"] = 3)
        (say person1["x"])        
        (say person2["x"])        
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
              (self["x"] = x)
            )

            (fun info () 
              (say self["x"])
            )
          )
        )
        (say "-----")
        (var person1 (new Person 1))
        (var person2 (new Person 2))
        (person1["info"])
        (person2["info"])
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
              (self["x"] = x)
            )
            (fun info () 
              (say "This is OOP: ")
              (say x)
            )
          )
        )

        (class Worker Person
          (fun constructor () {
          })  
        )

        (var worker (new Worker 10))
      )
    `
  );


  // parser.parseTest(
  //   `
  //     (block
  //       (class Person null
  //         (block
  //           (fun constructor () {
  //             (self["name"] = "bad boy")
  //           })

  //           (fun get () {
  //             (say "This is OOP: " self)
  //           })

  //           (fun set (key value) {
  //             (say "parent class property name: ")
  //             (self[key] = value)
  //           })
  //         )
  //       )

  //       (class Worker Person {
  //           (fun setParent (key value) {
  //             ((set key value))
  //             (get)
  //           })

  //           (fun constructor () {
  //             (self["age"] = 10)
  //             (self["setParent"] = setParent)
  //           })


  //         }  
  //       )

  //       (var worker (new Worker))
  //       ((worker["setParent"] "name" "good name"))        
  //     )
  //   `
  // );
};