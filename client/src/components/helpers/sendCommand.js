import axios from "axios";

const sendCommand = async (e,contents) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    channelID: 1,
    message: `<${1}>${contents}`,
    agentID: "1",
  });

  try {
   let res = await axios.post(
      "http://localhost:5000/api/chat/sendMessage/",
      body,
      config
    );

  } catch (err) {
    console.log(err);
  }
};

export default sendCommand;
