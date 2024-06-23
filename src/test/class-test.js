const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
      (block
        (class Person null {
            (fun constructor (x y) {
                (say "constructor!")
                (self["x"] = x)
                (self["y"] = y)
                (self["sum"] = sum)
              }
            )  

            (fun sum () {
              (var res 
                (self["x"] + self["y"]) 
              )
              (var msg "The res is ")
              (say msg res)
            })
          }
        )

        (var person (new Person 10 20))
        (person["sum"])
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
      {
        (class Person null {
          (fun constructor (x)
            (self["x"] = x)
          )

          (fun info () {
            (say x)
          })
        })
        (say "-----")
        (var person1 (new Person 1))
        (var person2 (new Person 2))
        (person1["info"])
        (person2["info"])
      }
    `
  );

  parser.parseTest(
    `
      {
        (class Person null {
          (fun constructor (num) {
          })
          (fun info () {
            (say "This is OOP: " self["num"])
          })
        })

        (class Worker Person {
          (fun constructor (num) {
            (self["num"] = num)
          })  
        })

        (var worker (new Worker 12345))
        (worker["info"])
      }
    `
  );


  parser.parseTest(
    `
      {
        (class Person null {
          (fun constructor () {})

          (fun get () {
            (say "This is OOP: " self[key])
          })

          (fun set (key value) {
            (self[key] = value)
            (say "property name: " self[key])
          })
        })

        (class Worker Person {
          (fun constructor () {})
        })

        (var worker (new Worker))
        (worker["set"] "name" "good boy")
      }
    `
  );

  parser.parseTest(
    `
      {
        (var arr (new List 10))

        (fun iterator () {
          (arr["map"]
            (fun (item index) {
              (say "arr[" index "] -----> " arr[index])
            })
          )
        })

        (arr["push"] "one")
        (arr["push"] "two")
        (arr["pop"])
        (arr["unshift"] "one")
        (arr["unshift"] "two")
        (arr["shift"])

        (iterator)
      }
    `
  );
};