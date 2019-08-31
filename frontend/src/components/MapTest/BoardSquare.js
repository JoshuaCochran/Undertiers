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
  const black = (x + y) % 2 === 1;
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

  return (
    <div
      ref={drop}
      style={{  
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && canDrop && <Overlay color="blue" />}
      {isOver && !canDrop && <Overlay color="red" />}
    </div>
  );
}
