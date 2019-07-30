import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  link: {
	  color: "white",
	  margin: theme.spacing(1),
	  fontSize: "20px",
  }
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.title}>
            Undertiers
            <Link component={RouterLink} to="/signin" className={classes.link}>
              Sign In
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
