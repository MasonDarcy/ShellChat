const getRequests = async () => {
  const config = {
    method: "GET",
    credentials: "include",
  };
  let res = await fetch(
    "http://localhost:5000/api/friends/info/requests",
    config
  );

  return res;
};

export default getRequests;
