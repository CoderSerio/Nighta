const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
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
  parser.parseTest(
    `
    (begin
      (
        (fun (msg) (say msg))
        "Lambda IIFE syntax is ok~"
      )
    )
    `,
  );

  parser.parseTest(
    `
    (begin
      (var sayHi (fun (msg) (say msg)))
      (sayHi "Lambda function can also be used as variable~")
    )
    `,
  );
};