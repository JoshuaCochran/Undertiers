import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

export default function TierFilterButton({ tier, func }) {
  const classes = useStyles();

  function clickHandler() {
    func(tier);
  }

  return (
    <Button className={classes.button} onClick={clickHandler}>
      Filter tier: {tier}
    </Button>
  );
}