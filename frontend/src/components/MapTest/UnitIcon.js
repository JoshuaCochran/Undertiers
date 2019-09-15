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
  }
}));

const renderAlliance = (alliance, key) => {
  return (
    <Grid item xs={1} key={key}>
      <img
        src={alliance.icon_url}
        alt={"Dota Underlords " + alliance.name + " icon"}
      />
    </Grid>
  );
};

const renderAlliances = unit => {
  const alliances = [];
  unit.alliances.forEach((alliance, key) => {
    alliances.push(renderAlliance(alliance, key));
  });
  return alliances;
};

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
        <Grid container spacing={2} direction="row">
          <Grid item xs={5}>
            <img
              src={props.unit.icon_url}
              alt={"Dota Underlords " + props.unit.name + " icon"}
            />
            <Typography className={classes.popoverContent}>
              {props.unit.name}
            </Typography>
          </Grid>
          <Grid item direction="column">
            {props.unit.alliances.map((alliance, key) => (
              <Grid item xs={2} key={key} className={classes.alliances}>
                <img
                  src={alliance.icon_url}
                  alt={"Dota Underlords " + alliance.name + " icon"}
                />
                {alliance.name}
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1}>
            ${props.unit.tier}
          </Grid>
        </Grid>
      </Popover>
    </Fragment>
  );
};

export default UnitIcon;
