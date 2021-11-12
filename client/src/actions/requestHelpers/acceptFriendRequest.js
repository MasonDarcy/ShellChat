import axios from "axios";

export const acceptFriendRequest = async (accepteeAgent) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const body = JSON.stringify({
    accepteeAgent: accepteeAgent,
  });

  let res = await axios.post(
    "http://localhost:5000/api/friends/accept",
    body,
    config
  );

  console.log(res);
};

export default acceptFriendRequest;
