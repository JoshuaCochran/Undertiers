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
      unitsOnMap: [{ unit: {}, board: {}, posx: 0, posy: 0 }],
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
  }

  async componentDidMount() {
    try {
      const res = await fetch("http://www.undertiers.com:8000/maps/2");
      const maps = await res.json();
      this.setState({
        unitsOnMap: maps,
        loadedMaps: true
      });
    } catch (e) {
      console.log(e);
    }
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

  async saveMap() {
    const new_data = {
      name: "Test",
      min_units: 1,
      max_units: 3,
      icon_url: "http://www.undertiers.com:8000/static/alliance_icons/mage.png",
      synergies: ["test"]
    };
    const res = await fetch("http://www.undertiers.com:8000/alliances/", {
      method: "POST",
      body: JSON.stringify(new_data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(data.result);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4} className={classes.board}>
          <Grid item xs={4}>
            <Board
              maps={this.state.unitsOnMap}
              unitDragged={this.state.unitDragged}
              updateMap={this.updateMap}
              saveMap={this.saveMap}
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
