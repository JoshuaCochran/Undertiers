import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PageviewIcon from "@material-ui/icons/Pageview";
import { UserContext } from "../UserStore";
import Grid from "@material-ui/core/Grid";
import AllianceList from "./AllianceList";
import UnitIconList from "./UnitIconList";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import BoardViewMode from "./BoardViewMode";
import MiniBoard from "../MiniBoard/MiniBoard";

const useStyles = makeStyles({
  "@global": {
    body: {
      backgroundColor: "rgba(13, 32, 43)",
      marginTop: "3%"
    }
  },
  card: {
    width: "60vw",
    marginTop: "1%",
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "rgba(12, 28, 37)",
    color: "rgba(144, 151, 147)"
  },
  cardClicked: {
    width: "60vw",
    marginTop: "1%",
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "rgba(12, 28, 37)",
    color: "rgba(144, 151, 147)",
    border: "1px solid rgb(34, 122, 173)",
    borderLeft: "5px solid rgb(34, 122, 173)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    color: "white"
  },
  description: {
    color: "white"
  },
  pos: {
    marginBottom: 12
  },
  subheadings: {
    marginBottom: 12,
    fontWeight: 550
  },
  upvoted: {
    color: "orange"
  },
  unpressedButton: {
    color: "white"
  }
});

const BoardCard = props => {
  const classes = useStyles();
  const boardLink = "/boards/" + props.id;
  const [upvote, setUpvote] = useState(props.upvoted);
  const [clicked, setClicked] = useState(false);
  const userContext = useContext(UserContext);

  if (props.upvoted !== upvote) setUpvote(props.upvoted);

  return (
    <Card
      className={clicked ? classes.cardClicked : classes.card}
      onClick={() => setClicked(!clicked)}
    >
      <CardContent>
        <Grid container spacing={1} direction="row">
          <Grid item xs={2}>
            <IconButton
              className={upvote ? classes.upvoted : classes.unpressedButton}
              onClick={
                userContext.loggedIn
                  ? () => props.clickUpvote(props.id, upvote)
                  : null
              }
            >
              {props.numUpvotes}
              <ThumbUpIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" component="p" className={classes.title}>
              {props.name}
            </Typography>
            <Typography variant="body2" component="p" className={classes.pos}>
              By {props.owner}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <UnitIconList units={props.pieces} />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              component={Link}
              to={boardLink}
              className={classes.unpressedButton}
            >
              <PageviewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      <Collapse in={clicked}>
        <CardContent>
          <Grid container spacing={1} direction="row">
            <Grid item xs={2}>
              <UnitIconList units={props.pieces.slice(0, 3)} />
              <Typography
                variant="body2"
                component="p"
                className={classes.subheadings}
              >
                EARLY GAME
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <UnitIconList units={props.pieces.slice(3, 3 + 5 + 1)} />
              <Typography
                variant="body2"
                component="p"
                className={classes.subheadings}
              >
                MID GAME
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <AllianceList units={props.pieces} isSmall={true} />
              <Typography
                variant="body2"
                component="p"
                className={classes.subheadings}
              >
                ALLIANCES
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent style={{ width: "20vw", height: "20vh" }}>
          <MiniBoard pieces={props.pieces}/>
          <Typography
                variant="body2"
                component="p"
                className={classes.subheadings}
              >
                POSITIONING
              </Typography>
        </CardContent>
        <CardContent>
          <Typography
            variant="body2"
            component="p"
            className={classes.description}
          >
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BoardCard;
