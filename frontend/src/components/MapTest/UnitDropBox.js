import React, { useState } from "react";
import Square from "./Square";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

const movePiece = (x, draggingId, units, setUnits) => {
  const temp = units.slice();
  const id = draggingId;
};

const createPiece = (x, unitDragged, units, setUnits) => {
  const temp = units;
  units[x] = unitDragged;
  setUnits(units);
}

const UnitDropBox = props => {
  const [{ isOver, canDrop, itemType }, drop] = useDrop({
    accept: [ItemTypes.BOARD_PIECE, ItemTypes.LIST_PIECE],
    canDrop: () => itemType === ItemTypes.LIST_PIECE ? true : false,
    drop: () =>
      itemType === ItemTypes.BOARD_PIECE
        ? movePiece(props.x, props.draggingId, props.units, props.setUnits)
        : createPiece(props.x, props.unitDragged, props.units, props.setUnits),
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