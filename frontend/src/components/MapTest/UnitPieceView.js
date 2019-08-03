import React from "react";

export default function UnitPiece({image}) {
  return (
    <>
      <div
        style={{
          opacity: 1,
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
            maxWidth: "100%",
            maxHeight: "100%"
          }}
        />
      </div>
    </>
  );
}
