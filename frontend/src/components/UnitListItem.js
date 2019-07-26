import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import { ItemTypes } from "./MapTest/DragTypes";
import { useDrag, DragPreviewImage } from "react-dnd";

const useStyles = makeStyles(theme => ({
  tileImage: {
    width: "100%",
    height: "auto",
  }
}));

export default function UnitListItem({
  id,
  unit,
  showPopover,
  onClick,
  handlePopoverOpen,
  handlePopoverClose,
  draggingUnit,
}) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.LIST_PIECE },
    begin: () => draggingUnit(unit),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const image = unit.icon_url;
  const classes = useStyles();
  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <GridListTile
        ref={drag}
        col={1}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move"
        }}
        aria-owns={showPopover ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={e => handlePopoverOpen(e, unit)}
        onMouseLeave={handlePopoverClose}
      >
        <img
          src={unit.icon_url}
          onClick={() => onClick(unit)}
          alt="{unit.name} icon"
          className={classes.tileImage}
        />
      </GridListTile>
    </>
  );
}
