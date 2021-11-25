import React, { useState, useEffect } from "react";
import ScrunchPanel from "./ScrunchPanel";
import Box from "./Box";
function BetaScrunch() {
  const [height, setHeight] = useState(0);

  /*I create a ref here. .*/
  const containerRef = React.createRef();
  const scrunchyRef = React.createRef();

  //   useEffect(() => {
  //     setHeight(containerRef.current.getBoundingClientRect().height);
  //   }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrunchyRef.current.style.top = `${200}px`;
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box ref={containerRef}>
      <ScrunchPanel
        ref={scrunchyRef}
        parentHeight={height}
        initialHeight={400}
        minHeight={50}
        resizeTargetBorderWidth={1}
        handleHeight={10}
      ></ScrunchPanel>
    </Box>
  );
}

export default BetaScrunch;
