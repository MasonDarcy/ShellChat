import axios from "axios";

const checkCredentials = async () => {
  const config = {
    withCredentials: true,
  };

  const { data } = await axios.get(
    "http://localhost:5000/api/agents/check/login",
    config
  );
  return data;
};

export default checkCredentials;
