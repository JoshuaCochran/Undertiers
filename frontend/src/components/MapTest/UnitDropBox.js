import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Square from "./Square";

const renderBoxes = boxNumber => {
  const boxes = [];
  const background = "rgb(27, 45, 51)";
  for (let i = 0; i < boxNumber; i++) {
    boxes.push(
      <Grid item xs={1} style={{ color: "white" }}>
        <div
          key={i}
          style={{
            width: "2.5vw",
            height: "5vh",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: background,
              width: "90%",
              height: "90%"
            }}
          >
            <Square border={true}>butts</Square>
          </div>
        </div>
      </Grid>
    );
  }
  return boxes;
};

const UnitDropBox = props => {
  const [units, setUnits] = useState(null);
  const boxes = renderBoxes(5);
  return (
    <Grid container spacing={1} direction="row">
      {boxes}
    </Grid>
  );
};

export default UnitDropBox;
