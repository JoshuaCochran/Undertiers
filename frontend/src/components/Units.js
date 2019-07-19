import React, { Component } from "react";
import UnitModal from "./UnitModal";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import UnitSortMenu from "./UnitSortMenu";
import UnitPopover from "./UnitPopover";

const styles = theme => ({
  root: {
    position: "absolute",
    height: "100%"
  }
});

class Units extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnit: false,
      unit: { alliance: [] },
      units: [],
      anchorEl: null,
      showPopover: false,
      showMenu: false,
      sortedAlphabetically: false,
      sortedByTier: false
    };

    this.onUnitClick = this.onUnitClick.bind(this);
    this.handleUnitClose = this.handleUnitClose.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.sortByTier = this.sortByTier.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://www.undertiers.com:8000/units/");
      const units = await res.json();
      this.setState({
        units
      });
      this.sortAlphabetically();
    } catch (e) {
      console.log(e);
    }
  }

  sortByTier() {
    const sortedByTier = this.state.sortedByTier;
    const myData = this.state.units.sort((a, b) =>
      sortedByTier ? a.tier - b.tier : b.tier - a.tier
    );
    this.setState({ units: myData, sortedByTier: !sortedByTier });
  }

  sortAlphabetically() {
    const alphabetical = this.state.sortedAlphabetically;
    const myData = this.state.units.sort(function(a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) return alphabetical ? 1 : -1;
      if (nameA > nameB) return alphabetical ? -1 : 1;
      return 0;
    });
    this.setState({
      units: myData,
      sortedAlphabetically: !this.state.sortedAlphabetically
    });
  }

  onUnitClick(unit) {
    this.setState({ showUnit: true, showAlliance: false, unit: unit });
  }

  handleUnitClose() {
    this.setState({ showUnit: false });
  }

  handleMenuClick(event) {
    this.setState({ anchorEl: event.currentTarget, showMenu: true });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null, showMenu: false });
  }

  handlePopoverOpen(event, unit) {
    this.setState({
      showPopover: true,
      unit: unit,
      anchorEl: event.currentTarget
    });
  }

  handlePopoverClose() {
    this.setState({ anchorEl: null, showPopover: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <UnitSortMenu
          anchorEl={this.state.anchorEl}
          showMenu={this.state.showMenu}
          handleMenuClick={this.handleMenuClick}
          handleMenuClose={this.handleMenuClose}
          sortByTier={this.sortByTier}
          sortAlphabetically={this.sortAlphabetically}
          sortedAlphabetically={this.state.sortedAlphabetically}
        />
        <UnitModal
          show={this.state.showUnit}
          handleUnitClose={() => this.handleUnitClose()}
          unit={this.state.unit}
        />
        <UnitPopover
          open={this.state.showPopover}
          anchorEl={this.state.anchorEl}
          handlePopoverClose={this.handlePopoverClose}
          unit={this.state.unit}
        />
        <GridList cellHeight={80} cols={15}>
          {this.state.units.map(item => (
            <GridListTile key={item.id} cols={1}>
              <img
                src={item.icon_url}
                onClick={() => this.onUnitClick(item)}
                alt="{item.name} icon"
                aria-owns={
                  this.state.showPopover ? "mouse-over-popover" : undefined
                }
                aria-haspopup="true"
                onMouseEnter={e => this.handlePopoverOpen(e, item)}
                onMouseLeave={this.handlePopoverClose}
              />
              <GridListTileBar title={item.name} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Units);
