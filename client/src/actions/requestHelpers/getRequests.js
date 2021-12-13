const getRequests = async () => {
  const config = {
    method: "GET",
    credentials: "include",
  };
  let res = await fetch(
    `/api/friends/info/requests`,

    config
  );

  return res;
};

export default getRequests;
