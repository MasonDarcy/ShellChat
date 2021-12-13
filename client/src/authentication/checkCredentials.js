const checkCredentials = async () => {
  const config = {
    method: "GET",
    credentials: "include",
  };

  let res = await fetch(`/api/agents/check/login`, config);

  let val = await res.json();
  return val;
};

export default checkCredentials;
