import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  }
});

export default function DescriptionCard({ owner, description, button }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" component="p">
          {description} {owner ? button : null}
        </Typography>
      </CardContent>
    </Card>
  );
}
