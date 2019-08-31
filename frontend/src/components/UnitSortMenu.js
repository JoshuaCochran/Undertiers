import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

export default function UnitSortMenu({ sortByTier, sortAlphabetically }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [open, setOpen] = useState(false);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setOpen(false);
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className={classes.button}
      >
        Sort
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={sortByTier}>By Tier</MenuItem>
        <MenuItem onClick={sortAlphabetically}>Alphabetically</MenuItem>
      </Menu>
    </div>
  );
}
