const program = require("commander");

program.version("0.0.1");

program.exitOverride();

program.configureOutput({
  // writeOut: (str) => {
  //   console.log(str);
  // },
  writeErr: (str) => console.log("There was an error"),
});

program.helpOption(false);

let t = program
  .command("add")
  .option(
    "-d, --double <boolean>",
    "applies a coefficient of value 2 to the sum"
  )
  .argument("firstOperand")
  .argument("secondOperand")
  .description("Add two integers")
  .action((f, s, options, command) => {
    console.log(t.helpInformation());
    if (options.double) {
      console.log((f + s) * 2);
    } else {
      console.log(f + s);
    }
  });

program
  .command("subtract")
  .option(
    "-d, --double <boolean>",
    "applies a coefficient of value 2 to the sum"
  )
  .argument("firstOperand")
  .argument("secondOperand")
  .description("Subtract two integers")
  .action((f, s, options, command) => {
    console.log(t.helpInformation());
    if (options.double) {
      console.log((f + s) * 2);
    } else {
      console.log(f + s);
    }
  });
let y = null;
let obj = {};

try {
  //  let q = program.parse(["null", "null", "blah", "-d", "true", "1", "2"]);
  console.log(program.commands[0].options);
} catch (err) {
  //  obj.error = err;
}

// console.log(
//   program.commands.forEach((command) => {
//     console.log(command.());
//   })
// );

// const errorThrower = () => {
//   throw new Error();
// };

// try {
//   errorThrower();
// } catch (err) {
//   console.log(`did i catch it ${err}`);
// }

// const EventEmitter = require("events");

// class BareEmitter extends EventEmitter {}
// const chat = new BareEmitter();

// const listenerFunc = (data) => {
//   console.log(data);
// };
// chat.on(`event`, listenerFunc);

// chat.emit(`event`, ["hello", "array"], "mreaghh");
