const getFriendListRequest = async () => {
  const config = {
    method: "GET",
    credentials: "include",
  };
  let res = await fetch("http://localhost:5000/api/friends/info/list", config);
  console.log("Before res.json()");

  return res;
};

export default getFriendListRequest;
