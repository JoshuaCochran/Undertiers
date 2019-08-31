import React, { Component } from "react";
import BoardSquareView from "./BoardSquareView";
import UnitPieceView from "./UnitPieceView";


class BoardViewMode extends Component {
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
        <BoardSquareView
          x={x}
          y={y}
        >
          {this.props.maps.length > 0 ? this.renderUnit(x, y) : null}
        </BoardSquareView>
      </div>
    );
  }

  renderUnit(x, y) {
    if (this.props.loaded && this.props.maps[0].unit) {
      return this.props.maps.map((item, i) => {
        if (x === item.posx && y === item.posy)
          return (
            <div key={i}>
              <UnitPieceView
                image={item.unit.icon_url}
              />
            </div>
          );
        return null;
      });
    }
    return null;
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
        </div>
      );
    }
}

export default BoardViewMode;
