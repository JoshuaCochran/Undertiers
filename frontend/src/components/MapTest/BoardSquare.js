import React from "react";
import Square from "./Square";
import Overlay from "./Overlay";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

export default function BoardSquare({
  x,
  y,
  canMovePiece,
  movePiece,
  createPiece,
  children
}) {
  const [{ isOver, canDrop, itemType }, drop] = useDrop({
    accept: [ItemTypes.BOARD_PIECE, ItemTypes.LIST_PIECE],
    canDrop: () => itemType === ItemTypes.BOARD_PIECE ? true : canMovePiece(x, y),
    drop: () =>
      itemType === ItemTypes.BOARD_PIECE
        ? movePiece(x, y)
        : createPiece(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      itemType: monitor.getItemType(),
    })
  });

  const background = "rgb(27, 45, 51)";

  return (
    <div
      ref={drop}
      style={{  
        position: "relative",
        backgroundColor: background,
        width: "90%",
        height: "90%"
      }}
    >
      <Square border={false}>{children}</Square>
      {isOver && canDrop && <Overlay color="blue" />}
      {isOver && !canDrop && <Overlay color="red" />}
    </div>
  );
}
