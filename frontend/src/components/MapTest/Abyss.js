import React from "react";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

export default function Abyss({ draggingId, draggingLocation, deleteUnit, children }) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOARD_PIECE,
    drop: () => isOver ? deleteUnit(draggingId, draggingLocation) : null,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true })
    })
  });

  return <div ref={drop}>{children}</div>;
}
