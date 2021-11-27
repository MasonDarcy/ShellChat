import React, { useState } from "react";
const { Rnd } = require("react-rnd");

function Embedded() {
  const [info, setInfo] = useState({ width: 400, height: 400, x: 10, y: 10 });

  const { x, y, width, height } = info;

  return (
    <Rnd
      size={{ width: width, height: height }}
      position={{ x: x, y: y }}
      maxHeight="50vh"
      maxWidth="50vw"
      onResizeStop={(e, direction, ref, delta, position) => {
        setInfo({
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      disableDragging={true}
      style={{
        border: "solid 1px #AAAFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f0f0",
      }}
    >
      <div className="text-red-200">Test??</div>
    </Rnd>
  );
}

export default Embedded;
{
  /* <Rnd
default={{
  x: 0,
  y: 0,
  width: 320,
  height: 200,
}}
>
<div className="border-solid border-1 border-red-500">
  <div className="border-solid border-1 border-red-500">
    child1 relative
  </div>
  <div className="child2">child2 absolute</div>
</div>
</Rnd> */
}
