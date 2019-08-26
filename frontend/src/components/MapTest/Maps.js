import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import HTML5Backend from "react-dnd-html5-backend";
import { MobileCheck } from "./MobileCheck";
import FilterRadioButtons from "./FilterRadioButtons";
import AllianceFilterRadioButtons from "./AllianceFilterRadioButtons";

import Board from "./Board";
import Units from "../Units";
import { tierFilter, allianceFilter } from "../sorting";
import Abyss from "./Abyss";
import { UserContext } from "../UserStore";

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
      displayUnits: this.props.units,
      unitDragged: null,
      draggingId: null
    };
    this.filterTier = this.filterTier.bind(this);
    this.filterAlliance = this.filterAlliance.bind(this);
    this.draggingUnit = this.draggingUnit.bind(this);
    this.draggingPiece = this.draggingPiece.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
  }

  filterTier(tier) {
    this.setState({ displayUnits: tierFilter(this.props.units, tier) });
  }

  filterAlliance(alliance) {
    this.setState({ displayUnits: allianceFilter(this.props.units, alliance) });
  }

  draggingUnit(unit) {
    this.setState({ unitDragged: unit });
  }

  draggingPiece(id) {
    this.setState({ draggingId: id });
  }

  updateMap(maps) {
    console.log("Called updateMap");
  }

  resetMap() {
    console.log("Called resetMap");
  }

  async saveMap() {
    console.log("Called saveMap");
    /*var new_data = [];
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
    });*/
  }

  deleteUnit(id) {}

  render() {
    const { classes } = this.props;
    return (
      <DndProvider backend={MobileCheck() ? TouchBackend : HTML5Backend}>
        <div className={classes.root}>
          <Abyss
            draggingId={this.state.draggingId}
            deleteUnit={this.deleteUnit}
          >
            <Grid container spacing={2} direction="column">
              <Grid container item spacing={1} xs={1} direction="row">
                <Grid item xs={4}>
                  <FilterRadioButtons filterTier={this.filterTier} />
                </Grid>
                <Grid item xs={2} className={classes.board}>
                <Board
                    board_id={this.props.board_id}
                    maps={this.props.board.pieces}
                    unitDragged={this.state.unitDragged}
                    draggingPiece={this.draggingPiece}
                    draggingId={this.state.draggingId}
                    updateMap={this.updateMap}
                    saveMap={this.saveMap}
                    resetMap={this.resetMap}
                    filterTier={this.filterTier}
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
                    units={this.state.displayUnits}
                    draggingUnit={this.draggingUnit}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Abyss>
        </div>
      </DndProvider>
    );
  }
}
Maps.contextType = UserContext;
export default withStyles(styles)(Maps);

/*
                  <Board
                    board_id={this.props.board_id}
                    maps={this.props.board.pieces}
                    unitDragged={this.state.unitDragged}
                    draggingPiece={this.draggingPiece}
                    draggingId={this.state.draggingId}
                    updateMap={this.updateMap}
                    saveMap={this.saveMap}
                    resetMap={this.resetMap}
                    filterTier={this.filterTier}
                    loaded={true}
                  />*/
