import React, { Component } from "react";
import UnitModal from "./UnitModal";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import UnitSortMenu from "./UnitSortMenu";
import UnitPopover from "./UnitPopover";
import UnitListItem from "./UnitListItem";

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
      anchorEl: null,
      showPopover: false,
    };

    this.onUnitClick = this.onUnitClick.bind(this);
    this.handleUnitClose = this.handleUnitClose.bind(this);
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  onUnitClick(unit) {
    this.setState({ showUnit: true, showAlliance: false, unit: unit });
  }

  handleUnitClose() {
    this.setState({ showUnit: false });
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
          sortByTier={this.props.sortByTier}
          sortAlphabetically={this.props.sortAlphabetically}
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
          {this.props.units.map((item, i) => (
            <UnitListItem
              key={i}
              unit={item}
              showPopover={this.state.showPopover}
              onClick={this.onUnitClick}
              handlePopoverOpen={this.handlePopoverOpen}
              handlePopoverClose={this.handlePopoverClose}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Units);
