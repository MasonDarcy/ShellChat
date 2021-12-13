const sendLogout = async () => {
  const config = {
    method: "DELETE",
    credentials: "include",
  };
  let res = await fetch(`/api/agents/logout`, config);

  return res;
};

export default sendLogout;
