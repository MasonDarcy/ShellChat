import axios from "axios";

const sendLogout = async () => {
  const config = {
    withCredentials: true,
  };

  return await axios.delete("http://localhost:5000/api/agents/logout", config);
};

export default sendLogout;
