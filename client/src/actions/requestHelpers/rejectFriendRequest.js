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
  let res = await fetch(`/api/friends/reject`, config);

  return res;
};

export default rejectFriendRequest;
