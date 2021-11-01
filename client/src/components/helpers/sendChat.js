import axios from "axios";

const sendChat = async (contents, cid) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    channelID: cid,
    message: `<${cid}>${contents}`,
    agentID: "1",
  });

  try {
    //  console.log(`called from within send chat: ${contents} ${cid}`);
    return await axios.post(
      "http://localhost:5000/api/chat/sendMessage/",
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

export default sendChat;
