import axios from "axios";

const sendChat = async (contents, cid, agentID) => {
  axios.defaults.withCredentials = true;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    channelID: cid,
    message: contents,
    agentID: agentID,
  });

  console.log(`AgentID: ${agentID}`);

  return await axios.post(
    "http://localhost:5000/api/chat/sendMessage/",
    body,
    config
  );
};

export default sendChat;
