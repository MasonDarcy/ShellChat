import React from "react";
import useSubscribeToChat from "./helpers/subscribe";

function Channel({ channelID }) {
  const backendURI = `http://localhost:5000/api/chat/${channelID}`;

  const data = useSubscribeToChat(backendURI);
  console.log(data);

  if (!data) {
    return <>Hello: {channelID}</>;
  }
  return <>{data}</>;
}

export default Channel;
