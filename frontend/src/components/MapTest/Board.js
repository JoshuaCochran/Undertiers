import React, { Component } from "react";
import BoardSquare from "./BoardSquare";
import UnitPiece from "./UnitPiece";
import CustomButton from "./CustomButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUnits: this.props.maps,
    }
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
          {this.props.maps.length > 0 ? this.renderUnit(x, y) : null}
        </BoardSquare>
      </div>
    );
  }

  renderUnit(x, y) {
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

  movePiece(toX, toY) {
    /*const maps = this.state.displayUnits.slice();
    const id = this.props.draggingId;
    maps.forEach((unit, i) => {
      if (unit.posx === toX && unit.posy === toY) {
        maps[i].posx = maps[id].posx;
        maps[i].posy = maps[id].posy;
      }
    });
    maps[id].posx = toX;
    maps[id].posy = toY;
    this.setState({ maps: maps });*/
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
    if (this.props.maps.filter(item => item.posy === toY && item.posx === toX).length)
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
          marginLeft: "30%",
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
        <Button style={{ color: "white" }} component={Link} to={url}>
          Exit
        </Button>
        <Button style={{ color: "white", textAlign: "center"}}>
          Units on Board: {this.props.maps.length}
        </Button>
      </div>
    );
  }
}

export default Board;
