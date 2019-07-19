import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

export default function UnitSortMenu({
  anchorEl,
  showMenu,
  handleMenuClick,
  handleMenuClose,
  sortByTier,
  sortAlphabetically,
  sortedAlphabetically
}) {
  const classes = useStyles();

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
        open={showMenu}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={sortByTier}>By Tier</MenuItem>
        <MenuItem onClick={sortAlphabetically}>
          {sortedAlphabetically ? "Z-A" : "A-Z"}
        </MenuItem>
      </Menu>
    </div>
  );
}
