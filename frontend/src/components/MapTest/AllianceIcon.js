import React, { useState, Fragment } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { borderColors } from "../borderColors";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  popoverContent: {},
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1),
    color: "white",
    backgroundColor: "rgba(13, 32, 43)",
    border: "1px solid",
    borderColor: borderColors["default"]
  },
  alliances: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end"
  },
  border: {}
}));

const AllianceIcon = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  function handleMouseEnter(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMouseLeave() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <img
        key={props.alliance.id}
        src={props.alliance.icon_url}
        alt={"Dota Underlords " + props.alliance.name + " icon"}
        style={{ width: "35px" }}
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
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid container item xs alignItems="center">
            <img
              src={props.alliance.icon_url}
              alt={"Dota Underlords " + props.alliance.name + " icon"}
            />
            {props.alliance.name}
          </Grid>
          <Grid container item xs direction="column">
            {props.alliance.synergies.map((item, key) => (
              <Grid item xs style={{color: (props.alliance.count > (key * props.alliance.min_units)) ? "white" : "grey"}}>
                {item}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Popover>
    </Fragment>
  );
};

export default AllianceIcon;
