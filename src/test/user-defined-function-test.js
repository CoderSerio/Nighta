const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  // parser.parseTest(
  //   `
  //   (block
  //     (fun square (x) 
  //       (* x x)
  //     )
  //     (var y (square 2))
  //     (say y)
  //   )
  //   `,
  // );
  // parser.parseTest(
  //   `
  //   (block
  //     (fun square (x y) 
  //       (block
  //         (var z 30)
  //         (* (+ x y) z)
  //       )
  //     )
  //     (square 10 2)
  //   )
  //   `,
  //   360
  // );
  // parser.parseTest(
  //   `
  //   (block
  //     (fun calc (x y) 
  //       (block
  //         (fun sum (a b) (+ a b))
  //         (sum x y)
  //       )
  //     )
  //     (calc 10 2)
  //   )
  //   `,
  //   12
  // );
  // parser.parseTest(
  //   `
  //   (block
  //     (fun sum (a b) (+ a b))

  //     (fun calc (callback x y) 
  //       (callback x y)
  //     )

  //     (calc sum 10 2)
  //   )
  //   `,
  //   12
  // );
  // parser.parseTest(
  //   `
  //   (block
  //     (fun sayMsg (msg)
  //       (block
  //         (var str "Hi, ")
  //         (say (+ str msg))
  //       ) 
  //     )
  //     (sayMsg "Nightaaaa")
  //   )
  //   `,
  // );
  // recursive
  parser.parseTest(
    `
    (block
      (fun sum (x)
        (if (x == 10)
          (say "recursive " x)
          (sum (x + 1))
        ) 
      )

      (sum 1)
    )
    `,
  );

  // parser.parseTest(`
  //   {
  //     (var list (new List 10))

  //     (list["map"] (fun (item index) {
  //         (list[index] = (10 - index))
  //     }))

  //     (fun iterator (arr) {
  //       (var i 0)
  //       (while (i < arr["len"]) {
  //         (say "[" i "] ===>" arr[i])
  //         (i = (i + 1))
  //       })
  //     })

  //     (say "===original list===")
  //     (iterator list)

  //     (fun quickSort (arr) {
  //         (if (arr["len"] > 1) {
  //           (var left (new List 0))
  //           (var right (new List 0))
  //           (var mid arr[0])

  //           (var i 1)
  //           (while (i < arr["len"]) {
  //             (if (arr[i] < mid) {
  //               (left["push"] arr[i])
  //             } {
  //               (right["push"] arr[i])
  //             })
  //             (i = (i + 1))
  //           })

  //           (quickSort left)
  //           (quickSort right)

  //           (var orderedList (new List 0))
  //           (left["map"] (fun (item) { (orderedList["push"] item )}))
  //           (orderedList["push"] mid)
  //           (right["map"] (fun (item) { (orderedList["push"] item )}))

  //           (say "===ordered list===")
  //           (iterator orderedList)
  //         } {
  //         })
  //     })

  //     (var res (quickSort list))
  //     (say "res " res)
  //   }
  //   `);
};