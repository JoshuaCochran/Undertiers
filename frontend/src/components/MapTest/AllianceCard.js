import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    width: 80,
    marginLeft: "10%",
    marginRight: "10%"
  }
});

export default function AllianceCard({ alliance }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <img src={alliance.icon_url} alt={"Dota Underlords " + alliance.name + " icon"}/>
        <Typography style={{ textAlign: "center" }} variant="h5" component="h5">
          ({alliance.count - (alliance.max_units % alliance.count)})
        </Typography>
      </CardContent>
    </Card>
  );
}
