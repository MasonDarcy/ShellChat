import React, { useEffect, useState } from "react";

function Channel({ channelID, agentID }) {
  const backendURI = `http://localhost:5000/api/testsse/chat/${channelID}/${agentID}`;

  const useEventSource = (url) => {
    const [data, updateData] = useState(null);

    useEffect(() => {
      const source = new EventSource(url);
      source.onmessage = function logEvents(event) {
        updateData(JSON.parse(event.data));
      };
    }, []);
    return data;
  };

  const data = useEventSource(backendURI);
  console.log(data);

  if (!data) {
    return (
      <>
        Hello: {channelID}
        {agentID}
      </>
    );
  }
  return <>{data}</>;
}

export default Channel;
