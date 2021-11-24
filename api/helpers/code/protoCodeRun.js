const { NodeVM } = require("vm2");
const esprima = require("esprima");
const escodegen = require("escodegen");
const uuidv4 = require("uuid");

let script = "let x = 10; while(1) { while(1){} };";

let parsed = esprima.parse(script);

///console.log(parsed.body[1].body);

const processAst = (body) => {
  if (!Array.isArray(body)) {
    //if it's not an array, it might be an object block.
    console.log("Body wasn't an array.");
    processAst(body.body);
    return;
  }

  body.forEach((ele, index) => {
    if (
      ele.type === "ForStatement" ||
      ele.type === "WhileStatement" ||
      ele.type === "DoWhileStatement"
    ) {
      let ast1 = esprima.parse("let beforeDate = Date.now();");
      let ast2 = esprima.parse("if (Date.now() - beforeDate > 1000) {}");

      console.log(`currentElement with infinite loop: ${ele.type}`);

      body.splice(index, 0, ast1.body[0]);
    }
    if (ele.body) {
      processAst(ele.body);
    }
  });
};

processAst(parsed.body);
// console.log(parsed.body);
// console.log("--------------------------------------");
// console.log(parsed.body[1]);
// console.log("--------------------------------------");
// console.log(parsed.body[1].body);
// console.log("--------------------------------------");
// console.log(parsed.body[1].body.body);
// console.log(parsed);
let newCode = escodegen.generate(parsed);
//console.log(newCode);
//before any loop
//let date = Date.now();
// Inside the loop
//if (Date.now() - myvar > 1000) { break;}
