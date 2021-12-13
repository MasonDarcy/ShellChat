export const getChannelModuleRequest = async (targetChannelID) => {
  const config = {
    method: "GET",
    credentials: "include",
  };

  let res = await fetch(`/api/chat/modules/channel/${targetChannelID}`, config);

  return await res.json();
};

export default getChannelModuleRequest;
