import React from "react";

const Box = React.forwardRef((props, ref) => (
  <div className="relativeLad" ref={ref}>
    {props.children}
  </div>
));

export default Box;
