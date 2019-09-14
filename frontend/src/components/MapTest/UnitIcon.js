import React, { useState, Fragment } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const borderColors = {
  "1": "rgb(33, 48, 66)",
  "2": "rgb(21, 104, 49)",
  "3": "rgb(16, 64, 124)",
  "4": "rgb(137, 48, 136)",
  "5": "rgb(184, 157, 39)",
  hover: "rgb(212, 117, 89)",
  popover: "rgb(27, 45, 51)",
};

const useStyles = makeStyles(theme => ({
  popoverContent: {

  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    color: "white",
    backgroundColor: "rgba(13, 32, 43)",
    border: "1px solid",
    borderColor: borderColors["popover"],
  }
}));

const UnitIcon = props => {
  const classes = useStyles();
  const [borderColor, setBorderColor] = useState(borderColors[props.unit.tier]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleMouseEnter(event) {
    setBorderColor(borderColors["hover"]);
    setAnchorEl(event.currentTarget);
  }

  function handleMouseLeave() {
    setBorderColor(borderColors[props.unit.tier]);
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <img
        key={props.key}
        src={props.unit.icon_url}
        alt={"Dota Underlords " + props.unit.name + " icon"}
        style={{
          width: "5vh",
          margin: "3px",
          border: "1px solid",
          borderColor: borderColor
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={event => handleMouseEnter(event)}
        onMouseLeave={() => handleMouseLeave()}
      />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        onClose={handleMouseLeave}
        disableRestoreFocus
        container={anchorEl ? anchorEl.parentNode : null}
      >
        <Typography className={classes.popoverContent}>I am {props.unit.name}!</Typography>
      </Popover>
    </Fragment>
  );
};

export default UnitIcon;
