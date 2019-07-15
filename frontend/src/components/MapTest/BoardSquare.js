import React from "react";
import Square from "./Square";
import { ItemTypes } from "./DragTypes";
import { useDrop } from "react-dnd";

export default function BoardSquare({ x, y, handleSquareClick, children }) {
  const black = (x + y) % 2 === 1;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => handleSquareClick(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver()
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
      {isOver && (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: 'blue',
            }}
        />
      )}
    </div>
  )
}
