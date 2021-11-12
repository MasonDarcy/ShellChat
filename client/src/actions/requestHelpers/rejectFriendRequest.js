import axios from "axios";

const acceptFriendRequest = async (rejecteeAgent) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const body = JSON.stringify({
    rejecteeAgent: rejecteeAgent,
  });

  let res = await axios.post(
    "http://localhost:5000/api/friends/reject",
    body,
    config
  );

  console.log(res);
};

export default acceptFriendRequest;
