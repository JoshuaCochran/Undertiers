import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

export default function CustomButton({ name, func }) {
  const classes = useStyles();
  const [text, setText] = useState(name);

  function changeText() {
    setText(name.substring(0, name.length - 1) + "ed!");
  }

  function clickHandler() {
    func();
    changeText();
  }

  return (
    <Button className={classes.button} onClick={clickHandler}>
      {text}
    </Button>
  );
}
