import axios from "axios";

const sendFriendRequest = async (agentSource, agentTarget) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    sourceAgentID: agentSource,
    targetAgentID: agentTarget,
  });

  console.log(body);

  return await axios.post(
    "http://localhost:5000/api/friends/request",
    body,
    config
  );
};

export default sendFriendRequest;
