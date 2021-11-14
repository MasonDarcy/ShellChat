const rejectFriendRequest = async (targetAgentID) => {
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
  let res = await fetch("http://localhost:5000/api/friends/reject", config);

  return res;
};

export default rejectFriendRequest;
