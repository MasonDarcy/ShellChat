export const sendFriendMessage = async (
  targetAgentID,
  message,
  sourceAgentID
) => {
  const config = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetAgentID: targetAgentID,
      sourceAgentID: sourceAgentID,
      message: message,
    }),
  };
  let res = await fetch("http://localhost:5000/api/friends/message", config);

  return await res;
};
export default sendFriendMessage;
