import React, { useState } from "react";
import UnitDropBox from "./UnitDropBox";
import UnitPiece from "./UnitPiece";

const renderBoxes = (quantity, units, setUnits, draggingId, unitDragged, draggingPiece) => {
  const boxes = [];
  const background = "rgb(27, 45, 51)";
  console.log("rendered");
  for (let i = 0; i < quantity; i++) {
    boxes.push(
      <UnitDropBox
        x={i}
        background={background}
        draggingId={draggingId}
        units={units}
        setUnits={setUnits}
        unitDragged={unitDragged}
      >
        {units && units[i] ? (
          <UnitPiece
            id={i}
            image={units[i].icon_url}
            draggingPiece={id => draggingPiece(id)}
          />
        ) : null}
      </UnitDropBox>
    );
  }
  return boxes;
};

const UnitDropBoxes = props => {
  const [units, setUnits] = useState(props.units);
  const boxes = renderBoxes(
    props.quantity,
    units,
    setUnits,
    props.draggingId,
    props.unitDragged,
    props.draggingPiece
  );
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        width: "20vw",
        height: "20vh"
      }}
    >
      {boxes}
    </div>
  );
};

export default UnitDropBoxes;
