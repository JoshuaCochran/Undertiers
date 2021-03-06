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
import Typography from "@material-ui/core/Typography";

import Board from "./Board";
import Units from "../Units";
import { tierFilter, allianceFilter } from "../sorting";
import Abyss from "./Abyss";
import { UserContext } from "../UserStore";
import UnitDropBoxes from "./UnitDropBoxes";
import BoardTextField from "./BoardTextField";

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
  units: {},
  title: {
    color: "white",
    textAlign: "center"
  },
  subheading: {
    color: "white",
    marginTop: "15%",
    fontWeight: 550
  }
});

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayUnits: this.props.units,
      unitDragged: null,
      draggingId: null,
      draggingLocation: null
    };
    this.filterTier = this.filterTier.bind(this);
    this.filterAlliance = this.filterAlliance.bind(this);
    this.draggingUnit = this.draggingUnit.bind(this);
    this.draggingPiece = this.draggingPiece.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
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

  draggingPiece(id, location) {
    this.setState({ draggingId: id, draggingLocation: location });
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
    var temp = data.slice(0);
    if (temp.length === 0) {
      unit = {
        posx: 0,
        posy: 0,
        unit: 0,
        board: this.props.board_id
      };
      new_data.push(unit);
    } else {
      new_data = temp.map(item => {
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

    new_data = this.props.board;
    new_data.early_game.map(item => {
      item = item.id;
    });
    new_data.mid_game.map(item => {
      item = item.id;
    });

    axios({
      method: "put",
      url:
        "http://www.undertiers.com:8000/boards/update/" +
        this.props.board_id +
        "/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.context.token
      },
      data: JSON.stringify({
        pk: this.props.board_id,
        name: new_data.name,
        user: new_data.user,
        description: new_data.description,
        early_game: new_data.early_game,
        mid_game: new_data.mid_game
      })
    }).catch(function(error) {
      console.log(error);
    });
  }

  deleteUnit(id, location) {
    if (location === "BOARD") {
      var newData = this.props.board.pieces.filter(item => {
        if (item.id != this.props.board.pieces[id].id) return item;
      });
      this.props.setBoardState(this.props.board_id, newData, location);
    } else if (location === "EARLY_GAME") {
      var newData = this.props.board.early_game.filter(item => {
        if (item && item.id != this.props.board.early_game[id].id) return item;
      });
      this.props.setBoardState(this.props.board_id, newData, location);
    } else if (location === "MID_GAME") {
      var newData = this.props.board.mid_game.filter(item => {
        if (item && item.id != this.props.board.mid_game[id].id) return item;
      });
      this.props.setBoardState(this.props.board_id, newData, location);
    }
  }

  updateOptions(state, location) {
    this.props.setBoardState(this.props.board_id, state, location);
  }

  render() {
    const { classes } = this.props;
    return (
      <DndProvider backend={MobileCheck() ? TouchBackend : HTML5Backend}>
        <Abyss
          draggingId={this.state.draggingId}
          draggingLocation={this.state.draggingLocation}
          deleteUnit={this.deleteUnit}
        >
          <div className={classes.root}>
            <Grid
              container
              spacing={1}
              direction="row"
              style={{ marginLeft: "30vw" }}
            >
              <BoardTextField
                board_id={this.props.board_id}
                input={this.props.board.name}
                submit={(title, location) =>
                  this.props.setBoardState(this.props.board_id, title, location)
                }
                long={false}
                setBoardState={this.props.setBoardState}
              />
            </Grid>
            <Grid container spacing={1} direction="row">
              <Grid item xs={2}>
                <FilterRadioButtons filterTier={this.filterTier} />
              </Grid>
              <Grid
                item
                xs={4}
                style={{ marginLeft: "22vw", marginTop: "1vh" }}
              >
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
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              style={{ marginLeft: "35vw" }}
            >
              <Grid item xs={2}>
                <UnitDropBoxes
                  quantity={3}
                  units={this.props.board.early_game}
                  board_id={this.props.board_id}
                  unitDragged={this.state.unitDragged}
                  draggingUnit={this.draggingUnit}
                  draggingPiece={this.draggingPiece}
                  draggingId={this.state.draggingId}
                  updateOptions={this.updateOptions}
                  location="EARLY_GAME"
                />
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.subheading}
                >
                  EARLY GAME
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <UnitDropBoxes
                  quantity={5}
                  units={this.props.board.mid_game}
                  board_id={this.props.board_id}
                  unitDragged={this.state.unitDragged}
                  draggingUnit={this.draggingUnit}
                  draggingPiece={this.draggingPiece}
                  draggingId={this.state.draggingId}
                  updateOptions={this.updateOptions}
                  location="MID_GAME"
                />
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.subheading}
                >
                  MID GAME
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} direction="row">
              <Grid item xs={2}>
                <AllianceFilterRadioButtons
                  filterAlliance={this.filterAlliance}
                />
              </Grid>
              <Grid
                container
                item
                xs={9}
                spacing={1}
                className={classes.units}
                direction="column"
              >
                <Grid item xs={5} style={{ minWidth: 1500, width: "100%", height: "auto"}}>
                  <BoardTextField
                    board_id={this.props.board_id}
                    input={this.props.board.description}
                    submit={description => this.changeDescription(description)}
                    long={true}
                    setBoardState={this.props.setBoardState}
                  />
                </Grid>
                <Grid item xs={5}>
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
