import React, { Component } from "react";
import BoardSquare from "./BoardSquare";
import UnitPiece from "./UnitPiece";
import CustomButton from "./CustomButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
          {this.props.pieces.length > 0 ? this.renderUnit(x, y) : null}
        </BoardSquare>
      </div>
    );
  }

  renderUnit(x, y) {
    return this.props.pieces.map((item, i) => {
      if (x === item.posx && y === item.posy)
        return (
          <div key={i}>
            <UnitPiece
              id={i}
              image={item.unit.icon_url}
              location="BOARD"
              draggingPiece={(id, location) =>
                this.props.draggingPiece(id, location)
              }
            />
          </div>
        );
      return null;
    });
  }

  movePiece(toX, toY) {
    const maps = this.props.pieces.slice();
    const id = this.props.draggingId;
    maps.forEach((unit, i) => {
      if (unit.posx === toX && unit.posy === toY) {
        maps[i].posx = maps[id].posx;
        maps[i].posy = maps[id].posy;
      }
    });
    maps[id].posx = toX;
    maps[id].posy = toY;
    var location = "BOARD";
    this.props.setBoardState(this.props.board_id, maps, location);
  }

  createPiece(x, y) {
    const newData = this.props.pieces.slice();
    newData.push({
      unit: this.props.unitDragged,
      board: this.props.board_id,
      posx: x,
      posy: y
    });
    var location = "BOARD";
    this.props.setBoardState(this.props.board_id, newData, location);
  }

  canMovePiece(toX, toY) {
    if (
      this.props.pieces.filter(item => item.posy === toY && item.posx === toX)
        .length
    )
      return false;
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
    const url = "/boards/" + this.props.board_id;
    return (
      <div
        style={{
          width: "20vw",
          height: "20vh",
          display: "flex",
          flexWrap: "wrap",
          position: "absolute"
        }}
      >
        {squareData}
        <CustomButton
          name={"Save"}
          func={() => this.props.saveMap(this.props.pieces)}
        />
        <CustomButton name={"Clear"} func={this.props.resetMap} />
        <Button style={{ color: "white" }} component={Link} to={url}>
          Exit
        </Button>
        <Button style={{ color: "white", textAlign: "center" }}>
          Units on Board: {this.props.pieces.length}
        </Button>
      </div>
    );
  }
}

export default Board;
