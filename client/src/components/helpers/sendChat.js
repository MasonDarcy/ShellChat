const sendChat = async (contents, cid, agentID) => {
  //axios.defaults.withCredentials = true;

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      channelID: cid,
      message: contents,
      agentID: agentID,
    }),
  };

  console.log(`AgentID: ${agentID}`);

  let res = fetch("/api/chat/sendMessage/", config);

  return res;
};

export default sendChat;
