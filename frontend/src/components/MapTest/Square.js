import React from "react";

const Square = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: props.border ? "2px solid grey" : null
      }}
    >
      {props.children}
    </div>
  );
}

export default Square;