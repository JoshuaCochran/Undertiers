import React from "react";
import UnitIcon from "../MapTest/UnitIcon";

const MiniSquare = (props, children) => {
  const background = "rgb(27, 45, 51)";
  return (
    <div
      style={{
        backgroundColor: background,
        width: "90%",
        height: "90%"
      }}
    >
      {Array.isArray(props.piece) && props.piece[0] ? (
        <img
          src={props.piece[0].unit.icon_url}
          style={{ width: "100%", height: "100%" }}
        />
      ) : null}
    </div>
  );
};

export default MiniSquare;
