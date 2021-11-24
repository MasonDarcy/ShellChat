import React, { useState, useRef } from "react";

function ResizablePane({ comp }) {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [offsetVal, setoffSet] = useState(400);
  const resizeRef = useRef(null);
  const resizeBox = useRef(null);

  let minHeight = 50;

  const initial = (e) => {
    setInitialPos(e.clientY);
    setInitialSize(
      resizeBox.current.clientHeight +
        (resizeBox.current.offsetHeight - resizeBox.current.clientHeight) -
        2
    );
    let test = resizeBox.current.offsetHeight - resizeBox.current.clientHeight;
    console.log(`Scrollbar height maybe: ${test}`);
    // console.log(`initial//initial position: ${initialPos}`);
    // console.log(`initial//offsetval: ${offsetVal}`);

    // console.log(`initial size: ${resizeBox.current.clientHeight}`);
    // console.log(`initial position: ${initialPos}`);
    // console.log(`initial clienty: ${e.clientY}`);
    // console.log(`initial pagey: ${e.pageY}`);
  };

  const resize = (e) => {
    //The last drag event always sets clientY to 0 for some reason.
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.clientY);

    if (e.clientY !== 0 && newHeight >= 50) {
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${parseInt(
        e.clientY - initialPos + offsetVal
      )}px`;
    }
  };

  const release = (e) => {
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.clientY);
    // console.log(`Release new height: ${newHeight}`);
    let newTop;
    if (newHeight >= 50) {
      newTop = parseInt(e.clientY - initialPos + offsetVal);
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${newTop}px`;
      setoffSet(newTop);
      setInitialSize(newHeight);
    } else {
      // console.log("under 50");
      // console.log(`offsetVal: ${offsetVal}`);

      resizeBox.current.style.height = `${minHeight}px`;
      newTop = parseInt(550);
      console.log(`new top: ${newTop}`);
      resizeBox.current.style.top = `${newTop}px`;
      setoffSet(newTop);
      setInitialSize(minHeight - 11);
      //make it the default small height
    }

    // console.log(`Release called: old initial position ${initialPos}`);
    // console.log(`Release called: clientY ${e.clientY}`);

    //setInitialPos(e.clientY);
    // setInitialSize(minHeight);
    // setoffSet(newTop);
    //-(offset - top)
    // console.log(`Release called: new initial position ${initialPos}`);
    // console.log(
    //   `Release called: top of resize box ${resizeBox.current.style.top}`
    // );
    // console.log(
    //   `Release called: height of resize box ${resizeBox.current.style.height}`
    // );
    // console.log(`Release called: clientY ${parseInt(e.clientY)}`);
    // console.log(`Release called: new initial pos ${initialPos}`);
    // console.log(`Release called: new initial size  ${initialSize}`);
  };

  const dragover = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="big">
        <div className="Block" ref={resizeBox}>
          <div
            id="Draggable"
            draggable="true"
            onDragStart={initial}
            onDrag={resize}
            onDragEnd={release}
            onDragOver={dragover}
          />
          <div id="Resizable" ref={resizeRef}></div>
        </div>
      </div>
    </>
  );
}

export default ResizablePane;
