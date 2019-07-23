import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

export default function SaveButton({ saveMap }) {
  const classes = useStyles();
  const [text, setText] = useState("Save");

  function test() {
    setText("Saved!");
  }
  return (
    <Button className={classes.button} onClick={saveMap}>
      {text}
    </Button>
  );
}
