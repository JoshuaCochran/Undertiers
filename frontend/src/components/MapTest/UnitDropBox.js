import React, { useState } from "react";
import Square from "./Square";

const renderBoxes = quantity => {
  const boxes = [];
  const background = "rgb(27, 45, 51)";
  for (let i = 0; i < quantity; i++) {
    boxes.push(
      <div
        style={{
          width: "12.5%",
          height: "25%",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: background,
            width: "80%",
            height: "80%",
          }}
        >
          <Square border={true}></Square>
        </div>
      </div>
    );
  }
  return boxes;
};

const UnitDropBox = props => {
  const [units, setUnits] = useState(null);
  const boxes = renderBoxes(props.quantity);
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        width: "20vw",
        height: "20vh",
      }}
    >
      {boxes}
    </div>
  );
};

export default UnitDropBox;
