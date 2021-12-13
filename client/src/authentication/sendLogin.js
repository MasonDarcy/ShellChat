const sendLogin = async (agentName, agentPassword) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      agentName: agentName,
      password: agentPassword,
    }),
  };

  let res = fetch(`/api/agents/login`, config);

  return res;
};

export default sendLogin;
