import React from "react";
import Square from "./Square";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

const movePiece = (x, draggingId, unitDragged, units, quantity, location, updateOptions) => {
  let temp = units;
  temp[draggingId] = temp[x];
  temp[x] = unitDragged;
  updateOptions(temp, location);
};

const createPiece = (x, unitDragged, units, quantity, location, updateOptions) => {
  let temp = units;
  temp[x] = unitDragged;
  updateOptions(temp, location);
}

const UnitDropBox = props => {
  const [{ isOver, canDrop, itemType }, drop] = useDrop({
    accept: [ItemTypes.BOARD_PIECE, ItemTypes.LIST_PIECE],
    canDrop: () => itemType === ItemTypes.LIST_PIECE ? true : true,
    drop: () =>
      itemType === ItemTypes.BOARD_PIECE
        ? movePiece(props.x, props.draggingId, props.unitDragged, props.units, props.quantity, props.location, props.updateOptions)
        : createPiece(props.x, props.unitDragged, props.units, props.quantity, props.location, props.updateOptions),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      itemType: monitor.getItemType()
    })
  });

  return (
    <div
      style={{
        width: "12.5%",
        height: "25%"
      }}
    >
      <div
        ref={drop}
        style={{
          position: "relative",
          backgroundColor: props.background,
          width: "80%",
          height: "80%"
        }}
      >
        <Square border={true}>{props.children}</Square>
      </div>
    </div>
  );
};

export default UnitDropBox;