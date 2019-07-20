import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Board from "./Board";
import Units from "../Units";

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
            unitsOnMap: [{ unit: {}, map: {}, posx: 0, posy: 0, piece_id: 0}],
            loadedMaps: false,
            loadedUnits: false,
        }
    }

    async componentDidMount() {
        try {
            const res = await fetch("http://www.undertiers.com:8000/maps/2");
            const maps = await res.json();
            maps.map((item, i) => {
              item.piece_id = i;
            });
            this.setState({
              unitsOnMap: maps, loadedMaps: true
            });
          } catch (e) {
            console.log(e);
          }
          try {
            const res = await fetch("http://www.undertiers.com:8000/units/");
            const units = await res.json();
            this.setState({
              units: units, loadedUnits: true
            });
            this.sortAlphabetically();
          } catch (e) {
            console.log(e);
          }
    }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4} className={classes.board}>
          <Grid item xs={4}>
            <Board unitsOnMap={this.state.unitsOnMap}/>
          </Grid>
        </Grid>
        <Grid container spacing={4} className={classes.units}>
          <Grid item xs={4}>
            <Units units={this.state.units}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Maps);
