const loadModuleRequest = async (
  moduleName,
  targetChannelID,
  sourceAgentID
) => {
  console.log(`loadModuleRequest: targetChannelID: ${targetChannelID}`);
  console.log(`loadModuleRequest: module: ${moduleName}`);

  const config = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moduleName: moduleName,
      targetChannelID: targetChannelID,
      sourceAgentID: sourceAgentID,
    }),
  };
  let res = await fetch("http://localhost:5000/api/chat/modules/open/", config);

  return res;
};

export default loadModuleRequest;
