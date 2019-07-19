import React, { Component } from "react";
import BoardSquare from "./BoardSquare";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import UnitPiece from "./UnitPiece";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [{ unit: {}, map: {}, posx: 0, posy: 0, piece_id: 0 }],
      loaded: false,
      draggingId: 0
    };
    this.movePiece = this.movePiece.bind(this);
    this.canMovePiece = this.canMovePiece.bind(this);
    this.draggingPiece = this.draggingPiece.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://www.undertiers.com:8000/maps/2");
      const maps = await res.json();
      maps.map((item, i) => {
        item.piece_id = i;
      });
      this.setState({
        maps
      });
      this.setState({ loaded: true });
    } catch (e) {
      console.log(e);
    }
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
        >
          {this.renderUnit(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderUnit(x, y) {
    if (this.state.loaded) {
      return this.state.maps.map((item, i) => {
        if (x === item.posx && y === item.posy)
          return (
            <div key={i}>
              <UnitPiece
                id={item.piece_id}
                image={item.unit.icon_url}
                draggingPiece={id => this.draggingPiece(id)}
              />
            </div>
          );
      });
    }
  }

  draggingPiece(id) {
    this.setState({ draggingId: id });
  }

  movePiece(toX, toY) {
    const maps = this.state.maps.slice();
    this.state.maps.map(item => {
      if (this.state.draggingId === item.piece_id) {
        item.posx = toX;
        item.posy = toY;
      }
    });
    this.setState({ maps: maps });
  }

  canMovePiece(toX, toY) {
    for (let i = 0; i < this.state.maps.length; i++) {
      if (
        this.state.draggingId !== this.state.maps[i].piece_id &&
        this.state.maps[i].posy === toY &&
        this.state.maps[i].posx === toX
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
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            marginLeft: "25%",
            marginRight: "25%",
            width: "50%",
            height: "50%",
            display: "flex",
            flexWrap: "wrap",
            position: "absolute",
          }}
        >
          {squareData}
        </div>
      </DndProvider>
    );
  }
}

export default Board;
