import React, { fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Board from "./Board";
import Units from "../Units";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(35, 35, 35)',
    height: '100vh',
  },
  units: {
    marginTop: "50vh",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    overFlowY: "auto",
  },
}));

export default function Maps({}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Board />
        </Grid>
      </Grid>
      <Grid container spacing={4} className={classes.units}>
        <Grid item xs={4}>
          <Units />
        </Grid>
      </Grid>
    </div>
  );
}
