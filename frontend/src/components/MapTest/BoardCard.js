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
import { UserContext } from "../UserStore";

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
    color: "rgba(144, 151, 147)",
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

export default function BoardCard({ id, name, owner, description, upvoted, clickUpvote, numUpvotes }) {
  const classes = useStyles();
  const boardLink = "/boards/" + id;
  const [upvote, setUpvote] = useState(upvoted);
  const contextValue = useContext(UserContext);

  if (upvoted !== upvote)
    setUpvote(upvoted);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" component="p">
          {name}
        </Typography>
        <Typography  variant="body3" component="p" className={classes.pos} color="gray">
          Submitted by {owner}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          className={upvote ? classes.upvoted : null}
          onClick={contextValue.loggedIn ? () => clickUpvote(id, upvote) : null}
        >
          {numUpvotes}
          <ThumbUpIcon />
        </IconButton>
        <IconButton component={Link} to={boardLink}>
          <PageviewIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
