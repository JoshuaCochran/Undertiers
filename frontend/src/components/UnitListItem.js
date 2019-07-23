import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import { ItemTypes } from "./MapTest/DragTypes";
import { useDrag } from "react-dnd";

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
  handlePopoverClose,
  draggingUnit,
}) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.LIST_PIECE },
    begin: () => draggingUnit(unit),
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    })
  });

  const classes = useStyles();
  return (
      <GridListTile key={unit.id} cols={1}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}>
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
