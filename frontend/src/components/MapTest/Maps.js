import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import HTML5Backend from "react-dnd-html5-backend";
import { MobileCheck } from "./MobileCheck";
import axios from "axios";
import FilterRadioButtons from "./FilterRadioButtons";
import AllianceFilterRadioButtons from "./AllianceFilterRadioButtons";

import Board from "./Board";
import Units from "../Units";
import {
  alphabeticalSort,
  tierSort,
  tierFilter,
  allianceFilter
} from "../sorting";
import Abyss from "./Abyss";
import { UserContext } from "../usercontext";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: "rgba(35, 35, 35)",
      marginTop: "3%"
    }
  },
  root: {
    flexGrow: 1,
    height: "100vh"
  },
  units: {
    marginTop: "12vh"
  },
  title: {
    color: "white",
    textAlign: "center"
  }
});

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      unitList: [],
      unitsOnMap: [],
      mapInfo: [],
      loadedMaps: false,
      loadedUnits: false,
      loadedBoard: false,
      isLoading: false,
      sortedAlphabetically: false,
      sortedByTier: false,
      unitDragged: null,
      draggingId: null,
      userToken: null,
      userTokenExp: null
    };
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortByTier = this.sortByTier.bind(this);
    this.filterTier = this.filterTier.bind(this);
    this.filterAlliance = this.filterAlliance.bind(this);
    this.draggingUnit = this.draggingUnit.bind(this);
    this.draggingPiece = this.draggingPiece.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.getMapInfo = this.getMapInfo.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.getUnitsOnMap = this.getUnitsOnMap.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
  }

  getUnitsOnMap() {
    axios({
      method: "get",
      url: "http://www.undertiers.com:8000/boards/" + this.props.board_id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.context.token
      }
    })
      .then(response => {
        var maps = response.data;
        var unit;
        for (let i = 0; i < maps.length; i++) {
          unit = this.state.units.filter(unit => unit.id === maps[i].unit);
          maps[i].unit = unit[0];
        }
        this.setState({
          unitsOnMap: maps,
          loadedMaps: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUnits() {
    axios({
      method: "get",
      url: "http://www.undertiers.com:8000/units/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.context.token
      }
    })
      .then(response => {
        this.setState({
          units: response.data,
          unitList: response.data,
          loadedUnits: true
        });
        this.sortAlphabetically();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getMapInfo() {
    axios({
      method: "get",
      url: "http://www.undertiers.com:8000/maps/" + this.props.board_id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.context.token
      }
    })
      .then(response => {
        this.setState({ mapInfo: response.data, loadedBoard: true });
      })
      .catch(function(error) {
        console.log(error);
      });
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

  filterTier(tier) {
    this.setState({ unitList: tierFilter(this.state.units, tier)});
  }

  filterAlliance(alliance) {
    this.setState({ unitList: allianceFilter(this.state.units, alliance) });
  }

  draggingUnit(unit) {
    this.setState({ unitDragged: unit });
  }

  draggingPiece(id) {
    this.setState({ draggingId: id });
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
    if (this.state.unitsOnMap.length === 0) {
      unit = {
        posx: 0,
        posy: 0,
        unit: 0,
        board: this.props.board_id
      };
      new_data.push(unit);
    } else
      for (let i = 0; i < this.state.unitsOnMap.length; i++) {
        unit = {
          posx: this.state.unitsOnMap[i].posx,
          posy: this.state.unitsOnMap[i].posy,
          unit: this.state.unitsOnMap[i].unit.id,
          board: this.props.board_id
        };
        new_data.push(unit);
      }
    axios({
      method: "post",
      url: "http://www.undertiers.com:8000/boards/add/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.context.token
      },
      data: JSON.stringify(new_data)
    }).catch(function(error) {
      console.log(error);
    });
  }

  deleteUnit(id) {
    var units = this.state.unitsOnMap;
    units.splice(id, 1);
    this.setState({ unitsOnMap: units });
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLoading && this.state.units.length === 0)
      axios.all([this.getUnits(), this.getMapInfo()]);
    if (this.state.isLoading && this.state.units.length > 0) {
      axios
        .all([this.getUnitsOnMap()])
        .then(response => this.setState({ isLoading: false }));
    }

    if (
      !this.state.isLoading &&
      this.state.mapInfo.length > 0 &&
      this.state.units.length > 0
    )
      return (
        <DndProvider backend={MobileCheck() ? TouchBackend : HTML5Backend}>
          <div className={classes.root}>
            <Abyss
              draggingId={this.state.draggingId}
              deleteUnit={this.deleteUnit}
            >
              <div className={classes.title}>{this.state.mapInfo[0].name}</div>
              <Grid container spacing={2} xs={12} direction="column">
                <Grid container item spacing={1} xs={1} direction="row">
                  <Grid item xs={4}>
                    <FilterRadioButtons filterTier={this.filterTier} />
                  </Grid>
                  <Grid item xs={2} className={classes.board}>
                    <Board
                      board_id={this.props.board_id}
                      maps={this.state.unitsOnMap}
                      unitDragged={this.state.unitDragged}
                      draggingPiece={this.draggingPiece}
                      draggingId={this.state.draggingId}
                      updateMap={this.updateMap}
                      saveMap={this.saveMap}
                      resetMap={this.resetMap}
                      filterTier={this.filterTier}
                      loaded={this.state.loadedMaps}
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3} direction="row">
                  <Grid item xs={2}>
                    <AllianceFilterRadioButtons
                      filterAlliance={this.filterAlliance}
                    />
                  </Grid>
                  <Grid item xs={10} className={classes.units}>
                    <Units
                      units={this.state.unitList}
                      loaded={this.state.loadedUnits}
                      sortAlphabetically={this.sortAlphabetically}
                      sortByTier={this.sortByTier}
                      draggingUnit={this.draggingUnit}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Abyss>
          </div>
        </DndProvider>
      );
    return <p>Loading...</p>;
  }
}
Maps.contextType = UserContext;
export default withStyles(styles)(Maps);
