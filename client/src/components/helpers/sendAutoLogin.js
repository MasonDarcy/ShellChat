import axios from "axios";

const sendAutoLogin = async () => {
  const config = {
    withCredentials: true,
  };

  return await axios.post(
    "http://localhost:5000/api/agents/login",
    body,
    config
  );
};

export default sendAutoLogin;
