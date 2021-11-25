import React, { useRef, useState, useLayoutEffect } from "react";
import ScrunchPanel from "./ScrunchPanel";
import Box from "./Box";
function ProtoScrunch() {
  const box = useRef();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    console.log("Is this running");
    if (box.current) {
      console.log(`box height: ${box.current.clientHeight} `);
      setHeight(box.current.clientHeight);
    }
  }, [height]);

  return (
    <div>
      <Box ref={box}>
        <ScrunchPanel
          ParentComponent={Box}
          parentHeight={height}
          initialHeight={400}
          minHeight={50}
          resizeTargetBorderWidth={1}
          handleHeight={10}
        >
          <div>waow</div>
        </ScrunchPanel>
      </Box>
    </div>
  );
}

export default ProtoScrunch;
