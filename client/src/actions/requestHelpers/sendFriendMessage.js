export const sendFriendMessage = async (targetAgentID, message) => {
  const config = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetAgentID: targetAgentID,
      message: message,
    }),
  };
  let res = await fetch(`/api/friends/message`, config);

  return await res;
};
export default sendFriendMessage;
