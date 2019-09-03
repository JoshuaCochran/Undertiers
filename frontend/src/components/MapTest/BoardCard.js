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
import { BoardContext } from "../BoardStore";
import Grid from "@material-ui/core/Grid";
import AllianceList from "./AllianceList";
import UnitIconList from "./UnitIconList";

const useStyles = makeStyles({
  "@global": {
    body: {
      backgroundColor: "rgba(13, 32, 43)",
      marginTop: "3%"
    }
  },
  card: {
    minWidth: 275,
    height: "10vh",
    marginTop: "1%",
    marginLeft: "10%",
    marginRight: "10%",
    backgroundColor: "rgba(12, 28, 37)",
    color: "rgba(144, 151, 147)"
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
  upvoted: {
    color: "orange"
  }
});

const BoardCard = props => {
  const classes = useStyles();
  const boardLink = "/boards/" + props.id;
  const [upvote, setUpvote] = useState(props.upvoted);
  const userContext = useContext(UserContext);
  const boardContext = useContext(BoardContext);

  if (props.upvoted !== upvote) setUpvote(props.upvoted);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={1} direction="row">
          <Grid item xs={1}>
            <IconButton
              className={upvote ? classes.upvoted : null}
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
          <Grid item xs={2}>
            <Typography variant="body2" component="p" className={classes.description}>
              {props.description}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <AllianceList units={props.pieces} isSmall={true} />
          </Grid>
          <Grid item xs={4}>
            <UnitIconList units={props.pieces} />
          </Grid>
          <Grid item xs={1}>
            <IconButton component={Link} to={boardLink}>
              <PageviewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BoardCard;
