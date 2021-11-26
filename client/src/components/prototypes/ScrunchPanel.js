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
  let minHeight = 50;
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
    setInitialSize(resizeBox.current.getBoundingClientRect().height - 11);
    //e.dataTransfer.setDragImage(<span></span>, 1, 1);
  };

  const resize = (e) => {
    //  let newHeight = parseInt(initialSize) + parseInt(initialPos - e.pageY);
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.pageY + 11);
    if (e.clientY !== 0 && newHeight >= minHeight) {
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${parseInt(e.pageY)}px`;
      setoffSet(e.pageY);
    }
  };

  const release = (e) => {
    let newHeight = parseInt(initialSize) + parseInt(initialPos - e.pageY + 11);
    let newTop;
    if (newHeight >= minHeight) {
      // newTop = parseInt(e.pageY);
      resizeBox.current.style.height = `${newHeight}px`;
      resizeBox.current.style.top = `${e.pageY}px`;
      setInitialSize(newHeight);
      console.log("Released called, greater than minheight.");
      handle.current.style.top = `${e.pageY}px`;
    } else {
      console.log("Released called, lesser than minheight.");
      resizeBox.current.style.height = `${minHeight}px`;
      resizeBox.current.style.top = `${offsetVal}px`;
      handle.current.style.top = `${offsetVal}px`;
      setInitialSize(minHeight);
    }
  };

  const dragover = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full h-full">
      <div
        ref={handle}
        id="Draggable"
        className="w-1/2"
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
