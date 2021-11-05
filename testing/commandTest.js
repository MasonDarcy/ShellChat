// const program = require("commander");

// program.version("0.0.1");

// program.configureOutput({
//   writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
//   writeErr: (str) => console.log("There was an error"),
// });

// program
//   .command("add")
//   .option(
//     "-d, --double <boolean>",
//     "applies a coefficient of value 2 to the sum"
//   )
//   .argument("firstOperand")
//   .argument("secondOperand")
//   .description("Say Something Interesting")
//   .action((f, s, options, command) => {
//     if (options.double) {
//       return (f + s) * 2;
//     } else {
//       return f + s;
//     }
//   });

// let obj = {};
// //program.exitOverride();
// try {
//   let q = program.parse(["null", "null", "blah", "-d", "true", "1", "2"]);
// } catch (err) {
//   //  obj.error = err;
// }

// const errorThrower = () => {
//   throw new Error();
// };

// try {
//   errorThrower();
// } catch (err) {
//   console.log(`did i catch it ${err}`);
// }

const EventEmitter = require("events");

class BareEmitter extends EventEmitter {}
const chat = new BareEmitter();

const listenerFunc = (data) => {
  console.log(data);
};
chat.on(`event`, listenerFunc);

chat.emit(`event`, ["hello", "array"], "mreaghh");
