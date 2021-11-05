import axios from "axios";

const sendChat = async (contents, cid, agentID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // const body = JSON.stringify({
  //   channelID: cid,
  //   message: `<${cid}> ${agentID}: ${contents}`,
  //   agentID: agentID,
  // });
  const body = JSON.stringify({
    channelID: cid,
    message: contents,
    agentID: agentID,
  });

  return await axios.post(
    "http://localhost:5000/api/chat/sendMessage/",
    body,
    config
  );
};

export default sendChat;
