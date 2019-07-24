import React, { Component } from "react";
import { withStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Board from "./Board";
import Units from "../Units";
import { alphabeticalSort, tierSort } from "../sorting";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgba(35, 35, 35)",
    height: "100vh"
  },
  units: {
    marginTop: "50vh",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    overFlowY: "auto",
    width: "90%",
    marginLeft: "5%"
  },
  board: {}
});

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      unitsOnMap: [{}],
      loadedMaps: false,
      loadedUnits: false,
      sortedAlphabetically: false,
      sortedByTier: false,
      unitDragged: null
    };
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortByTier = this.sortByTier.bind(this);
    this.draggingUnit = this.draggingUnit.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.resetMap = this.resetMap.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://www.undertiers.com:8000/units/");
      const units = await res.json();
      this.setState({
        units: units,
        loadedUnits: true
      });
      this.sortAlphabetically();
    } catch (e) {
      console.log(e);
    }
    this.loadMapData();
  }

  async loadMapData() {
    try {
      const res = await fetch(
        "http://www.undertiers.com:8000/maps/" + this.props.board_id
      );
      const maps = await res.json();
      var unit;
      for (let i = 0; i < maps.length; i++)
      {
        unit = this.state.units.filter(unit => unit.id === maps[i].unit);
        maps[i].unit = unit[0];
      }
      this.setState({
        unitsOnMap: maps,
        loadedMaps: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  sortAlphabetically() {
    this.setState({
      units: alphabeticalSort(
        this.state.units.slice(),
        this.state.sortedAlphabetically
      ),
      sortedAlphabetically: !this.state.sortedAlphabetically
    });
  }

  sortByTier() {
    this.setState({
      units: tierSort(this.state.units.slice(), this.state.sortedByTier),
      sortedByTier: !this.state.sortedByTier
    });
  }

  draggingUnit(unit) {
    this.setState({ unitDragged: unit });
  }

  updateMap(maps) {
    this.setState({ unitsOnMap: maps });
  }

  resetMap() {
    this.setState({ unitsOnMap: [] });
  }

  async saveMap() {
    var new_data = [];
    var unit;
    for (let i = 0; i < this.state.unitsOnMap.length; i++) {
      unit = {
        posx: this.state.unitsOnMap[i].posx,
        posy: this.state.unitsOnMap[i].posy,
        unit: this.state.unitsOnMap[i].unit.id,
        board: this.props.board_id
      };
      new_data.push(unit);
    }
    await fetch("http://www.undertiers.com:8000/maps/add", {
      method: "POST",
      body: JSON.stringify(new_data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(JSON.stringify(new_data));
    this.loadMapData();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4} className={classes.board}>
          <Grid item xs={4}>
            <Board
              board_id={this.props.board_id}
              maps={this.state.unitsOnMap}
              unitDragged={this.state.unitDragged}
              updateMap={this.updateMap}
              saveMap={this.saveMap}
              resetMap={this.resetMap}
              loaded={this.state.loadedMaps}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} className={classes.units}>
          <Grid item xs={4}>
            <Units
              units={this.state.units}
              maps={true}
              sortAlphabetically={this.sortAlphabetically}
              sortByTier={this.sortByTier}
              draggingUnit={this.draggingUnit}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Maps);
