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
        cursor: "move",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <img
        src={image}
        alt="test"
        style={{
          maxWidth: "100%",
          maxHeight: "100%"
        }}
      />
    </div>
  );
}
