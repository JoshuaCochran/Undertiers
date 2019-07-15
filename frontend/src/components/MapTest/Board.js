import React, { Component } from "react";
import BoardSquare from "./BoardSquare";
import Knight from "./Knight";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knightPosition: [0, 0],
    };
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div
        key={i}
        style={{ width: "12.5%", height: "12.5%" }}
        onClick={() => this.handleSquareClick(x, y)}
      >
        <BoardSquare x={x} y={y} handleSquareClick={() => this.handleSquareClick(x, y)}>
          {this.renderPiece(x, y, this.state.knightPosition)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  handleSquareClick(toX, toY) {
    this.setState({ knightPosition: [toX, toY] });
  }

  renderSquares = () => {
    const squareData = [];
    for (let i = 0; i < 64; i++) {
      squareData.push(this.renderSquare(i));
    }
    return squareData;
  };

  render() {
    const squareData = this.renderSquares();

    return (
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            position: "absolute"
          }}
        >
          {squareData}
        </div>
      </DndProvider>
    );
  }
}

export default Board;
