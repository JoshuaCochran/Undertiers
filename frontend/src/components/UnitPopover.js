import React from "react";
import Popover from "@material-ui/core/Popover";
import UnitInfo from "./UnitInfo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none"
  },
  dialogPaper: {
    minHeight: "125px",
    maxHeight: "125px",
    minWidth: "145px",
    maxWidth: "145px",
    backgroundColor: "rgba(35, 35, 35)",
    overflow: "hidden",
    height: "100%"
  }
}));

export default function UnitPopover({
  open,
  anchorEl,
  handlePopoverClose,
  unit
}) {
  const classes = useStyles();

  return (
    <Popover
      id="mouse-over-popover"
      open={open}
      className={classes.popover}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      container={anchorEl ? anchorEl.parentNode : null}
      classes={{ paper: classes.dialogPaper }}
    >
      <UnitInfo unit={unit} />
    </Popover>
  );
}
