import React from "react";
import Square from "./Square";

export default function BoardSquareView({
  x,
  y,
  children
}) {
  const black = (x + y) % 2 === 1;
 
  return (
    <div
      style={{  
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square black={black}>{children}</Square>
    </div>
  );
}
