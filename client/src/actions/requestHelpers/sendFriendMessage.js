import axios from "axios";

export const sendFriendMessage = async (
  targetAgentID,
  message,
  sourceAgentID
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const body = JSON.stringify({
    targetAgentID: targetAgentID,
    sourceAgentID: sourceAgentID,
    message: message,
  });

  let res = await axios.post(
    "http://localhost:5000/api/friends/message",
    body,
    config
  );

  console.log(res);
};

export default sendFriendMessage;
