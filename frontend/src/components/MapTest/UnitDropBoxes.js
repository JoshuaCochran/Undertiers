import React from "react";
import UnitDropBox from "./UnitDropBox";
import UnitPiece from "./UnitPiece";

const renderBoxes = (
  quantity,
  units,
  draggingId,
  unitDragged,
  draggingPiece,
  location,
  updateOptions,
  draggingUnit
) => {
  const boxes = [];
  const background = "rgb(27, 45, 51)";
  for (let i = 0; i < quantity; i++) {
    boxes.push(
      <UnitDropBox
        x={i}
        background={background}
        draggingId={draggingId}
        units={units}
        unitDragged={unitDragged}
        key={i * quantity}
        quantity={quantity}
        updateOptions={updateOptions}
        location={location}
      >
        {units && units[i] ? (
          <UnitPiece
            id={i}
            image={units[i].icon_url}
            location={location}
            draggingPiece={(id, location) => draggingPiece(id, location)}
            draggingUnit={(unit) => draggingUnit(unit)}
            unit={units[i]}
          />
        ) : null}
      </UnitDropBox>
    );
  }
  return boxes;
};

const UnitDropBoxes = props => {

  const boxes = renderBoxes(
    props.quantity,
    props.units,
    props.draggingId,
    props.unitDragged,
    props.draggingPiece,
    props.location,
    props.updateOptions,
    props.draggingUnit
  );
  return (
    <div
      key={props.quantity}
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
