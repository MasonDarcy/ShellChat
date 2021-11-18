export const getChannelModuleRequest = async (targetChannelID) => {
  const config = {
    method: "GET",
    credentials: "include",
  };

  let res = await fetch(
    `http://localhost:5000/api/chat/modules/channel/${targetChannelID}`,
    config
  );

  return await res.json();
};

export default getChannelModuleRequest;
