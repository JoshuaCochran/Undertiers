import React, { fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Board from "./Board";
import Units from "../Units";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(35, 35, 35)',
  },
  units: {
    marginTop: "50vh",
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
  },
  map: {
 
  }
}));

export default function Maps({}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={24} className={classes.map}>
        <Grid item xs={4}>
          <Board />
        </Grid>
      </Grid>
      <Grid container spacing={24} className={classes.units}>
        <Grid item xs={4}>
          <Units />
        </Grid>
      </Grid>
    </div>
  );
}
