import axios from "axios";

const sendLogin = async (agentName, agentPassword) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const body = JSON.stringify({
    agentName: agentName,
    password: agentPassword,
  });
  console.log(body);

  return await axios.post(
    "http://localhost:5000/api/agents/login",
    body,
    config
  );
};

export default sendLogin;
