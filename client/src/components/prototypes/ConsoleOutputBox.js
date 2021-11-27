import React, { useRef, useState, useEffect } from "react";

function ConsoleOutputBox({ codeOutput }) {
  /*REFS------------------------------------------------------------*/
  const outputContainer = useRef(null);
  const handle = useRef(null);
  const handleY = useRef(null);

  /*----------------------------------------------------------------*/
  /*POSITIONING-----------------------------------------------------*/
  /*The BOTTOM has to go up, and the HEIGHT has to go up equally.---*/
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [offsetVal, setoffSet] = useState(null);
  /*----------------------------------------------------------------*/

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", release);
    window.addEventListener("ondragstart", dragstart);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", release);
      window.removeEventListener("ondragstart", dragstart);
    };
  });

  const initial = (e) => {
    e.preventDefault();
    //pageHeight - pageY = the new bottom?
    let bottom = window.innerHeight - e.pageY;
    console.log(`window inner height: ${window.innerHeight}`);
    console.log(`e.pageY: ${e.pageY}`);
    console.log(`bottom calculation: ${bottom}`);
    setInitialPos(bottom);
    //set the size? hmm lol
    setInitialSize(bottom);
    handleY.current = e.pageY;
  };

  const resize = (e) => {
    //new bottom?
    //  resizeBox.current.style.top = `${parseInt(e.pageY)}px`;
    if (!handleY.current) {
      return;
    }
    let height = window.innerHeight - e.pageY;
    handle.current.style.bottom = `${parseInt(height)}px`;
    outputContainer.current.style.height = `${parseInt(height)}px`;
  };

  const release = (e) => {
    handleY.current = null;
    console.log(`Released. handleY.current: ${handleY.current}`);
  };

  const dragstart = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        ref={handle}
        draggable={false}
        onMouseDown={initial}
        className="fixed w-full h-0 bottom-1/4 border-solid border-2 border-white-100 z-10"
      >
        {" "}
      </div>
      <div
        draggable={false}
        ref={outputContainer}
        className="fixed  w-full h-1/4 bottom-0 border-solid border-2 border-red-900 z-10"
      ></div>
    </>
  );
}

export default ConsoleOutputBox;
