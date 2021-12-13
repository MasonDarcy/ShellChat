export const runCodeRequest = async (script, agentID, channelID) => {
  // const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = `/api/chat/jdoodle`;

  const config = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      script: script,
      sourceAgentID: agentID,
      channelID: channelID,
    }),
  };

  let res = await fetch(url, config);

  return res;
};
export default runCodeRequest;
