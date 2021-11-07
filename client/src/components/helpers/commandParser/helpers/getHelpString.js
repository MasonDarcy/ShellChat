export const getHelpString = (command) => {
  let output = `Command name: ${command._name}\nDescription: ${command._description}\n`;

  if (command._args.length > 0) {
    output += "Arguments\n";
    command._args.forEach((arg) => {
      output += `   <${arg._name}>: ${arg.description}\n`;
    });
  }

  return output;
};

export const getAllHelpStrings = (commands) => {
  let output = "";
  commands.forEach((c) => {
    output += getHelpString(c) + "\n";
  });
  console.log(commands);
  return output;
};
