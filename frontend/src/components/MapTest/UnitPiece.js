import React from "react";
import { ItemTypes } from "./DragTypes";
import { useDrag, DragPreviewImage } from "react-dnd";

export default function UnitPiece({ id, image, draggingPiece, location, draggingUnit, unit}) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.BOARD_PIECE },
    begin: () => { 
      draggingPiece(id, location);
      if (location === "EARLY_GAME" || location === "MID_GAME") draggingUnit(unit);
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <>
      <DragPreviewImage connect={preview} src={image}/>
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
          position: "absolute"
        }}
      >
        <img
          src={image}
          alt="test"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%"
          }}
        />
      </div>
    </>
  );
}
