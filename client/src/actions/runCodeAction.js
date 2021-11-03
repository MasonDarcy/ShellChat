import { RUN_CODE_ACTION } from "./types";
//import { scriptRunner } from "../components/helpers/vm";
//const vm = require("vm");

export const runCodeAction = (codeString, outputName) => (dispatch) => {
  const sandbox = {};

  //let output = scriptRunner("let o = 1", "o");
  //Yeahhh I cant do this in the front end lol
  dispatch({
    type: RUN_CODE_ACTION,
    payload: codeString,
  });
};
