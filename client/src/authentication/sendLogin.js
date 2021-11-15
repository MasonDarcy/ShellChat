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

  let res = fetch("http://localhost:5000/api/agents/login", config);

  return res;
};

export default sendLogin;
