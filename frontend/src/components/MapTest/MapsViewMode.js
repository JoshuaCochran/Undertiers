import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import BoardViewMode from "./BoardViewMode";
import { UserContext } from "../usercontext";
import DescriptionCard from "./DescriptionCard";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import BoardTextField from "./BoardTextField";
import { getAllAlliances } from "../allianceCounting";
import AllianceList from "./AllianceList";

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: "rgba(35, 35, 35)",
      marginTop: "5%"
    }
  },
  root: {
    flexGrow: 1,
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
    gridGap: `${theme.spacing(3)}px`
  }
});

class MapsViewMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      unitsOnMap: [],
      mapInfo: [],
      loadedMaps: false,
      loadedUnits: false,
      loadedBoard: false,
      isLoading: false,
      showingTitleField: false,
      showingDescriptionField: false
    };
    this.getMapInfo = this.getMapInfo.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.getUnitsOnMap = this.getUnitsOnMap.bind(this);
    this.showTitleField = this.showTitleField.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.showDescriptionField = this.showDescriptionField.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
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
          <EditIcon />
        </Button>
        <Button
          onClick={() => getAllAlliances(this.state.unitsOnMap)}
          className={style}
        >
          Count alliances
        </Button>
      </Grid>
    );
  }

  showTitleField() {
    this.setState({ showingTitleField: !this.state.showingTitleField });
  }

  changeTitle(title) {
    var newInfo = this.state.mapInfo;
    newInfo[0].name = title;
    this.setState({ mapInfo: newInfo, showingTitleField: false });
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
      data: JSON.stringify({ pk: this.props.board_id, name: title })
    }).catch(function(error) {
      console.log(error);
    });
  }

  showDescriptionField() {
    this.setState({
      showingDescriptionField: !this.state.showingDescriptionField
    });
  }

  changeDescription(description) {
    var newInfo = this.state.mapInfo;
    newInfo[0].description = description;
    this.setState({ mapInfo: newInfo, showingDescriptionField: false });
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
        description: description
      })
    }).catch(function(error) {
      console.log(error);
    });
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
    var isMapOwner = false;
    if (
      !this.state.isLoading &&
      this.state.mapInfo.length > 0 &&
      this.state.units.length > 0
    ) {
      isMapOwner =
        this.context.loggedIn && this.context.user != null
          ? this.context.user.username === this.state.mapInfo[0].username
          : false;
      return (
        <div className={classes.root}>
          <Grid container spacing={5}>
          <Grid item container spacing={1} direction="column" justify="center">
            <Grid
              item
              xs={1}
              style={{
                textAlign: "center",
                marginLeft: "40vw",
                marginRight: "40vw"
              }}
            >
              {this.state.showingTitleField ? (
                <BoardTextField
                  input={this.state.mapInfo[0].name}
                  submit={title => this.changeTitle(title)}
                  long={false}
                />
              ) : (
                <DescriptionCard
                  owner={isMapOwner}
                  description={this.state.mapInfo[0].name}
                  button={
                    <IconButton onClick={this.showTitleField}>
                      <EditIcon />
                    </IconButton>
                  }
                />
              )}
            </Grid>
            <Grid container item spacing={1} xs={1} direction="row">
              <Grid item xs={2}>
                <BoardViewMode
                  board_id={this.props.board_id}
                  title={this.state.mapInfo[0].name}
                  maps={this.state.unitsOnMap}
                  loaded={this.state.loadedMaps}
                />
              </Grid>
              <Grid item xs={4}>
                <AllianceList units={this.state.unitsOnMap} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            item
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid container item spacing={5} direction="row">
              <Grid
                item
                xs={2}
                style={{marginLeft: "30vw", marginTop: "5vh"}}
              >
                {isMapOwner ? this.renderEditButton(classes.button) : null}
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={1}
              justify="center"
              alignItems="center"
              direction="row"
            >
              <Grid item xs={6}>
                {this.state.showingDescriptionField ? (
                  <BoardTextField
                    input={this.state.mapInfo[0].description}
                    submit={description => this.changeDescription(description)}
                    long={true}
                  />
                ) : (
                  <DescriptionCard
                    owner={isMapOwner}
                    description={this.state.mapInfo[0].description}
                    button={
                      <IconButton onClick={this.showDescriptionField}>
                        <EditIcon />
                      </IconButton>
                    }
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}
MapsViewMode.contextType = UserContext;
export default withStyles(styles)(MapsViewMode);
