const Parser = require('../parser/Parser');

module.exports = (nighta) => {
  const parser = new Parser(nighta);
  parser.parseTest(
    `
    (block
      (fun onClick (callback) (block
        (block
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
    (block
      (
        (fun (msg) (say msg))
        "Lambda IIFE syntax is ok~"
      )
    )
    `,
  );

  parser.parseTest(
    `
    (block
      (var sayHi (fun (msg) (say msg)))
      (sayHi "Lambda function can also be used as variable~")
    )
    `,
  );
};