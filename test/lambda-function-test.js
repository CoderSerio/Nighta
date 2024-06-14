const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  new Parser(nighta).parseTest(
    `
    (begin
      (fun onClick (callback) (begin
        (begin
          (callback)
        )
      ))
      (onClick (fun () (say "Lambda function syntax is ok~")))
    )
    `,
  );

  // IILE
  new Parser(nighta).parseTest(
    `
    (begin
      (
        (fun (msg) (say msg))
        "Lambda IIFE syntax is ok~"
      )
    )
    `,
  );

  new Parser(nighta).parseTest(
    `
    (begin
      (var sayHi (fun (msg) (say msg)))
      (sayHi "Lambda function can also be used as variable~")
    )
    `,
  );
};