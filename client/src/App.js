import { useEffect, useState } from "react";
const axios = require("axios");

const backendURI = "http://localhost:5000/api/testsse/chat/1/1";

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

function App() {
  const data = useEventSource(backendURI);
  console.log(data);
  if (!data) {
    console.log("No data");
    return <>Hello</>;
  }
  return <>{data}</>;
}

export default App;
