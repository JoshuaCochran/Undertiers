import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import BoardViewMode from "./BoardViewMode";
import { UserContext } from "../usercontext";
import DescriptionCard from "./DescriptionCard";

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
  title: {
    color: "white",
    textAlign: "center"
  },
  button: {
    color: "white"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: `${theme.spacing.unit * 3}px`
  }
});

class MapsViewMode extends Component {
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
      isLoading: false
    };
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
        "Content-Type": "application/json"
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
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.setState({
          units: response.data,
          unitList: response.data,
          loadedUnits: true
        });
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
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        this.setState({ mapInfo: response.data, loadedBoard: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  renderEditButton(style) {
    const url = "/boards/edit/" + this.props.board_id;
    return (
      <Grid xm={9}>
        <Button component={Link} to={url} className={style}>
          Edit
        </Button>
      </Grid>
    );
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
        <div className={classes.root}>
          <div className={classes.title}>{this.state.mapInfo[0].name}</div>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="center"
          >
            <Grid container item spacing={1} xs={1} direction="row">
              <Grid item xs={2}>
                <BoardViewMode
                  board_id={this.props.board_id}
                  maps={this.state.unitsOnMap}
                  loaded={this.state.loadedMaps}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} justify="center" alignItems="center" direction="column">
            <Grid container item spacing={3} direction="row">
              <Grid
                item
                xs={2}
                style={{ marginTop: "45vh", marginLeft: "60vh" }}
              >
                {this.context.loggedIn && this.context.user != null
                  ? this.context.user.username === this.state.mapInfo[0].user
                    ? this.renderEditButton(classes.button)
                    : null
                  : null}
              </Grid>
            </Grid>
            <Grid container item spacing={3} justify="center" alignItems="center" direction="row">
              <Grid item xs={6}>
                <DescriptionCard
                  description={this.state.mapInfo[0].description}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    return <p>Loading...</p>;
  }
}
MapsViewMode.contextType = UserContext;
export default withStyles(styles)(MapsViewMode);
