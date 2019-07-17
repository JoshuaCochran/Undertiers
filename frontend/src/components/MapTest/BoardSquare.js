import React from "react";
import Square from "./Square";
import Overlay from "./Overlay";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

export default function BoardSquare({ x, y, canMovePiece, movePiece, children }) {
  const black = (x + y) % 2 === 1;
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.UNIT,
    canDrop: () => canMovePiece(x, y),
    drop: () => movePiece(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
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
      {isOver && canDrop && <Overlay color="blue"/>}
      {isOver && !canDrop && <Overlay color="red"/>}
    </div>
  )
}
