import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles(theme => ({
  tileImage: {
    width: "100%",
    height: "auto"
  }
}));

export default function UnitListItem({
  unit,
  showPopover,
  onClick,
  handlePopoverOpen,
  handlePopoverClose
}) {
  const classes = useStyles();
  return (
    <GridListTile key={unit.id} cols={1}>
      <img
        src={unit.icon_url}
        onClick={() => onClick(unit)}
        alt="{unit.name} icon"
        aria-owns={showPopover ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={e => handlePopoverOpen(e, unit)}
        onMouseLeave={handlePopoverClose}
        className={classes.tileImage}
      />
    </GridListTile>
  );
}
