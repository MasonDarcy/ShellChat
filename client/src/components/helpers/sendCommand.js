import axios from "axios";

const sendCommand = async (e, channelID, contents) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    channelID: channelID,
    message: `<${channelID}>${contents}`,
    agentID: "1",
  });

  try {
    await axios.post(
      "http://localhost:5000/api/chat/sendMessage/",
      body,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

export default sendCommand;
