import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import HTML5Backend from "react-dnd-html5-backend";
import { MobileCheck } from "./MobileCheck";
import FilterRadioButtons from "./FilterRadioButtons";
import AllianceFilterRadioButtons from "./AllianceFilterRadioButtons";
import axios from "axios";

import Board from "./Board";
import Units from "../Units";
import { tierFilter, allianceFilter } from "../sorting";
import Abyss from "./Abyss";
import { UserContext } from "../UserStore";
import UnitDropBox from "./UnitDropBox"

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: "rgba(13, 32, 43)",
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
    this.props.setBoardState(this.props.board_id, []);
  }

  async saveMap(data) {
    console.log("Called saveMap");
    var new_data = [];
    var unit;
    if (data.length === 0) {
      unit = {
        posx: 0,
        posy: 0,
        unit: 0,
        board: this.props.board_id
      };
      new_data.push(unit);
    } else {
      new_data = data.map(item => {
        item.unit = item.unit.id;
        return item;
      });
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
    var newData = this.props.board.pieces.filter(item => {
      if (item.id != this.props.board.pieces[id].id) return item;
    });
    this.props.setBoardState(this.props.board_id, newData);
  }

  render() {
    const { classes } = this.props;
    return (
      <DndProvider backend={MobileCheck() ? TouchBackend : HTML5Backend}>
        <Abyss draggingId={this.state.draggingId} deleteUnit={this.deleteUnit}>
          <div className={classes.root}>
            <Grid container spacing={2} direction="column">
              <Grid container item spacing={1} xs={1} direction="row">
                <Grid item xs={4}>
                  <FilterRadioButtons filterTier={this.filterTier} />
                </Grid>
                <Grid item xs={2} className={classes.board}>
                  <Board
                    board_id={this.props.board_id}
                    pieces={this.props.board.pieces}
                    unitDragged={this.state.unitDragged}
                    draggingPiece={this.draggingPiece}
                    draggingId={this.state.draggingId}
                    updateMap={this.updateMap}
                    saveMap={this.saveMap}
                    resetMap={this.resetMap}
                    filterTier={this.filterTier}
                    setBoardState={this.props.setBoardState}
                  />
                </Grid>
                <Grid item xs={2} style={{marginLeft: "60vw"}}>
                <UnitDropBox/>
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
          </div>
        </Abyss>
      </DndProvider>
    );
  }
}
Maps.contextType = UserContext;
export default withStyles(styles)(Maps);
