import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "./usercontext";
import { MemoryRouter as Router } from "react-router";
import Button from "@material-ui/core/Button";

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
    marginLeft: "80%"
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
            <UserContext.Consumer>
              {({ loggedIn, logOut }) => (
                <Router>
                  <Button
                    href={
                      loggedIn ? "" : "http://www.undertiers.com:3000/signin"
                    }
                    className={classes.link}
                    onClick={loggedIn ? logOut : null}
                  >
                    {loggedIn ? "Logout" : "Login"}
                  </Button>
                </Router>
              )}
            </UserContext.Consumer>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
