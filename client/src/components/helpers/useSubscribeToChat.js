import { useEffect, useState } from "react";

const useSubscribeToChat = (url) => {
  const [data, updateData] = useState(null);

  useEffect(() => {
    const source = new EventSource(url);
    source.onmessage = function logEvents(event) {
      updateData(JSON.parse(event.data));
    };
  }, []);
  return data;
};

export default useSubscribeToChat;
