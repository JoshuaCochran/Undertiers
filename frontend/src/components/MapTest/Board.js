import React, { Component } from "react";
import BoardSquare from "./BoardSquare";
import UnitPiece from "./UnitPiece";
import CustomButton from "./CustomButton";

class Board extends Component {
  constructor(props) {
    super(props);

    this.movePiece = this.movePiece.bind(this);
    this.canMovePiece = this.canMovePiece.bind(this);
    this.createPiece = this.createPiece.bind(this);
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);

    return (
      <div
        key={i}
        style={{
          width: "12.5%",
          height: "25%"
        }}
      >
        <BoardSquare
          x={x}
          y={y}
          movePiece={() => this.movePiece(x, y)}
          canMovePiece={() => this.canMovePiece(x, y)}
          createPiece={() => this.createPiece(x, y)}
        >
          {this.renderUnit(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderUnit(x, y) {
    if (this.props.loaded) {
      return this.props.maps.map((item, i) => {
        if (x === item.posx && y === item.posy)
          return (
            <div key={i}>
              <UnitPiece
                id={i}
                image={item.unit.icon_url}
                draggingPiece={id => this.props.draggingPiece(id)}
              />
            </div>
          );
        return null;
      });
    }
    return null;
  }

  movePiece(toX, toY) {
    const maps = this.props.maps.slice();
    maps[this.props.draggingId].posx = toX;
    maps[this.props.draggingId].posy = toY;
    this.setState({ maps: maps });
  }

  createPiece(x, y) {
    const newData = this.props.maps.slice();
    newData.push({
      unit: this.props.unitDragged,
      board: this.props.board_id,
      posx: x,
      posy: y
    });
    this.props.updateMap(newData);
  }

  canMovePiece(toX, toY) {
    for (let i = 0; i < this.props.maps.length; i++) {
      if (
        this.props.draggingId !== i &&
        this.props.maps[i].posy === toY &&
        this.props.maps[i].posx === toX
      ) {
        return false;
      }
    }
    return true;
  }

  renderSquares = () => {
    const squareData = [];
    for (let i = 0; i < 32; i++) {
      squareData.push(this.renderSquare(i));
    }
    return squareData;
  };

  render() {
    const squareData = this.renderSquares();

    return (
        <div
          style={{
            marginLeft: "25%",
            marginRight: "25%",
            marginTop: "3%",
            width: "40%",
            height: "40%",
            display: "flex",
            flexWrap: "wrap",
            position: "absolute"
          }}
        >
          {squareData}
          <CustomButton name={"Save"} func={this.props.saveMap} />
          <CustomButton name={"Clear"} func={this.props.resetMap} />
        </div>
    );
  }
}

export default Board;
