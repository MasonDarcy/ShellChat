const sendSignup = async (agentName, agentPassword) => {
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

  let res = await fetch("http://localhost:5000/api/agents/", config);
  return res;
};

export default sendSignup;
