import React from "react";
import MiniSquare from "./MiniSquare";

const renderSquare = (i, pieces) => {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const piece = pieces.filter(item => {
    return item.posx === x && item.posy === y;
  });

  return (
    <div
      key={i}
      style={{
        width: "12.5%",
        height: "25%",
      }}
    >
      <MiniSquare piece={piece} />
    </div>
  );
};

const renderSquares = pieces => {
  const squares = [];
  for (let i = 0; i < 32; i++) {
    squares.push(renderSquare(i, pieces));
  }
  return squares;
};

const MiniBoard = props => {
  const board = renderSquares(props.pieces);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "100%"
      }}
    >
      {board}
    </div>
  );
};

export default MiniBoard;
