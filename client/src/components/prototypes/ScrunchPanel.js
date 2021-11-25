import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  initialHeight,
} from "react";
/*
 */
// initialHeight,
//   children,
//   minHeight,
//   resizeTargetBorderWidth,
//   handleHeight,
const ScrunchPanel = React.forwardRef((props, ref) => {
  let minHeight = 10;
  let resizeTargetBorderWidth = 1;

  const resizeBox = useRef(null);
  const handle = useRef(null);

  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [offsetVal, setoffSet] = useState(props.editorHeight);

  console.log(`Editor height: ${props.editorHeight}`);
  //30
  console.log(`offsetVal: ${offsetVal}`);
  //0

  const initial = (e) => {
    console.log(`clientY in initial: ${e.pageY}`);
    setInitialPos(e.pageY);
    // setInitialSize(
    //   resizeBox.current.clientHeight +
    //     (resizeBox.current.offsetHeight - resizeBox.current.clientHeight) -
    //     resizeTargetBorderWidth * 2
    // );
    setInitialSize(resizeBox.current.getBoundingClientRect().height - 11);
  };

  const resize = (e) => {
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.pageY);

    if (e.clientY !== 0 && newHeight >= minHeight) {
      resizeBox.current.style.height = `${newHeight}px`;

      //What's wrong with this?
      //  console.log(`offsetVal in resize: ${offsetVal}`);

      // resizeBox.current.style.top = `${parseInt(
      //   e.clientY - initialPos + resizeBox.current.top
      // )}px`;

      console.log(`offsetVal: ${offsetVal}`);
      console.log(`before: ${resizeBox.current.getBoundingClientRect().top}`);
      let val = resizeBox.current.getBoundingClientRect().top;
      // resizeBox.current.style.top = `${parseInt(
      //   e.clientY - initialPos + offsetVal
      // )}px`;
      resizeBox.current.style.top = `${parseInt(e.pageY)}px`;

      // console.log(`after: ${resizeBox.current.getBoundingClientRect().top}`);
      // resizeBox.current.style.top = `${parseInt(
      //   e.clientY - initialPos + resizeBox.current.getBoundingClientRect().top
      // )}px`;
    }

    //  console.log(`Resize offset: ${offsetVal}`);
  };

  const release = (e) => {
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.pageY);
    let newTop;
    if (newHeight >= minHeight) {
      newTop = parseInt(e.clientY - initialPos + offsetVal);

      resizeBox.current.style.height = `${newHeight}px`;
      //resizeBox.current.style.top = `${newTop}px`;
      resizeBox.current.style.top = `${e.pageY}px`;
      setInitialSize(newHeight);
      // setoffSet(newTop);
      //setoffSet(e.pageY);
      console.log("Released called, greater than minheight.");
      handle.current.style.top = `${e.pageY}px`;
      //  handle.current.style.top = `${newTop}px`;
    } else {
      console.log("Released called, lesser than minheight.");
      resizeBox.current.style.height = `${minHeight}px`;
      newTop = parseInt(550);
      console.log(`new top: ${newTop}`);
      resizeBox.current.style.top = `${newTop}px`;
      // setoffSet(newTop);
      setInitialSize(
        minHeight -
          (ref.current.offsetHeight -
            ref.current.clientHeight -
            resizeTargetBorderWidth * 2)
      );
      // setoffSet(newTop);
      // handle.current.style.top = `${newTop}px`;
      setoffSet(e.pageY);
      handle.current.style.top = `${e.pageY}px`;
    }
  };

  const dragover = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div
        ref={handle}
        id="Draggable"
        style={{ top: props.editorHeight + 10 }}
        draggable="true"
        onDragStart={initial}
        onDrag={resize}
        onDragEnd={release}
        onDragOver={dragover}
      />
      <div
        className="Block"
        ref={resizeBox}
        style={{ top: props.editorHeight + 10 }}
      >
        <div id="Resizable"></div>
      </div>
    </div>
  );
});

export default ScrunchPanel;

// draggable="true"
// onDragStart={initial}
// onDrag={resize}
// onDragEnd={release}
// onDragOver={dragover}
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

// useEffect(() => {
//   const timer = setTimeout(() => {
//     console.log("This will run after 1 second!");
//     // setHeightOfParent(500);
//     console.log(`Trying things: ${outer.current.parentElement.clientHeight}`);
//     console.log(
//       `Bounding: ${
//         outer.current.parentElement.getBoundingClientRect().height
//       }`
//     );
//   }, 5000);
//   return () => clearTimeout(timer);
// }, []);

// const [handleOffsetVal, setHandleOffSet] = useState(400 - handleHeight);
// const [testHandle, setSetHandle] = useState();

// useImperativeHandle(ref, () => ({
//   get box() {
//     return resizeBox.current;
//   },
//   get handle() {
//     return handle.current;
//   },
// }));
