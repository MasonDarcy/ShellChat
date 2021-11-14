const sendFriendRequest = async (targetAgentID) => {
  const config = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetAgentID: targetAgentID,
    }),
  };

  let res = await fetch("http://localhost:5000/api/friends/request", config);

  return res;
};

export default sendFriendRequest;
