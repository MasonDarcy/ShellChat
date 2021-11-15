const sendLogout = async () => {
  const config = {
    method: "DELETE",
    credentials: "include",
  };
  let res = await fetch("http://localhost:5000/api/agents/logout", config);

  return res;
};

export default sendLogout;
