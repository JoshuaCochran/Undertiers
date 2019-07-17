import React from "react";
import { ItemTypes } from "./DragTypes";
import { useDrag } from "react-dnd";

export default function UnitPiece({ id, image, draggingPiece }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.UNIT },
    begin: () => draggingPiece(id),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}
    >
      <img src={image} alt="test" style={{ width: "50%", height: "50%" }} />
    </div>
  );
}
