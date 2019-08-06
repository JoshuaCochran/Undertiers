import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PageviewIcon from "@material-ui/icons/Pageview";
import { Upvote } from "../Login";
import { UserContext } from "../usercontext";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "10%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  upvoted: {
    color: "orange"
  }
});

export default function BoardCard({ id, name, owner, description, upvoted}) {
  const classes = useStyles();
  const boardLink = "/boards/" + id;
  const [upvote, setUpvote] = useState(upvoted);
  const contextValue = useContext(UserContext);
  const userId = contextValue.user.id;

  function clickUpvote() {
    setUpvote(!upvote);
    Upvote(id, userId);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Submitted by {owner}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton className={upvote ? classes.upvoted : null} onClick={() => clickUpvote()}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton component={Link} to={boardLink}>
          <PageviewIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
