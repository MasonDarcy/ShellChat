import React, { useState, useRef, useEffect } from "react";

/* 
What does this thing need to be abstracted?

Parameters
1. Pass in the child component that will live inside the resized box
// 2. Pass in a top height for the component to sit
3. Pass in a minimum height for the component to scrunch
4. Pass in a maximum height for the component to stretch
5. Pass in data describing the handle (required height)
6. Pass in data describing the resize box (need to know border width)
7. Pass in reference to the relative target element (?)
*/

function ResizablePane(props) {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [offsetVal, setoffSet] = useState(400);
  const [heightOfBig, setHeightOfBig] = useState(400);
  const [handleOffsetVal, setHandleOffSet] = useState(380);

  const resizeRef = useRef(null);
  const resizeBox = useRef(null);
  const handle = useRef(null);
  const big = useRef(null);

  let minHeight = 50;
  let handleHeight = 20;
  let resizeTargetBorderWidth = 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      setHeightOfBig(500);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    big.current.style.height = `${heightOfBig}px`;
    setoffSet(heightOfBig);
    big.current.style.height = `${heightOfBig}px`;
    resizeBox.current.style.top = `${heightOfBig}px`;
  }, [heightOfBig]);

  const initial = (e) => {
    setInitialPos(e.clientY);
    setInitialSize(
      resizeBox.current.clientHeight +
        (resizeBox.current.offsetHeight - resizeBox.current.clientHeight) -
        resizeTargetBorderWidth * 2
    );

    // let test = resizeBox.current.offsetHeight - resizeBox.current.clientHeight;
    //console.log(`Scrollbar height maybe: ${test}`);
  };

  const resize = (e) => {
    //The last drag event always sets clientY to 0 for some reason.
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.clientY);
    console.log(`e.clientY: ${e.clientY}`);

    if (e.clientY !== 0 && newHeight >= minHeight) {
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${parseInt(
        e.clientY - initialPos + offsetVal
      )}px`;

      handle.current.style.top = handle.current.style.top = `${parseInt(
        e.clientY - initialPos + handleOffsetVal
      )}px`;
    }
  };

  const release = (e) => {
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.clientY);
    // console.log(`Release new height: ${newHeight}`);
    let newTop;
    let newHandleTop;
    if (newHeight >= minHeight) {
      newTop = parseInt(e.clientY - initialPos + offsetVal);
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${newTop}px`;
      setoffSet(newTop);
      setInitialSize(newHeight);

      newHandleTop = parseInt(e.clientY - initialPos + handleOffsetVal);
      newHandleTop = newTop - handleHeight;
      handle.current.style.top = `${newHandleTop}px`;
      console.log(`set handle top: ${newHandleTop}`);

      setHandleOffSet(newHandleTop);
    } else {
      console.log("min height block");
      resizeBox.current.style.height = `${minHeight}px`;
      newTop = parseInt(550);
      console.log(`new top: ${newTop}`);
      resizeBox.current.style.top = `${newTop}px`;
      setoffSet(newTop);
      setInitialSize(
        minHeight -
          (resizeBox.current.offsetHeight -
            resizeBox.current.clientHeight -
            resizeTargetBorderWidth * 2)
      );

      //11
      //make it the default small height
      //   newHandleTop = parseInt(e.clientY - initialPos + handleOffsetVal);
      newHandleTop = newTop - handleHeight;
      handle.current.style.top = `${newHandleTop}px`;
      console.log(`set handle top: ${newHandleTop}`);

      setHandleOffSet(newHandleTop);
    }
  };

  const dragover = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="big" ref={big}>
        <div
          ref={handle}
          id="Draggable"
          draggable="true"
          onDragStart={initial}
          onDrag={resize}
          onDragEnd={release}
          onDragOver={dragover}
        />
        <div className="Block" ref={resizeBox}>
          <div id="Resizable" ref={resizeRef} />
        </div>
      </div>
    </>
  );
}

export default ResizablePane;

{
  /* <div
id="Draggable"
draggable="true"
onDragStart={initial}
onDrag={resize}
onDragEnd={release}
onDragOver={dragover}
/> */
}
