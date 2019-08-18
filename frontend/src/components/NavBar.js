import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "./usercontext";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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
    fontSize: "20px"
  }
}));

function renderRegister(style) {
  return (
    <Button className={style} component={Link} to="/register">
      register
    </Button>
  );
}

function renderLogInLogOut(loggedIn, logOut, style) {
  if (loggedIn)
    return (
      <Button className={style} onClick={logOut}>
        Logout
      </Button>
    );
  return (
    <Button component={Link} to="/signin" className={style}>
      Login
    </Button>
  );
}

function renderMyBoards(style) {
  return (
    <Button component={Link} to="/boards/me" className={style}>
      My Boards
    </Button>
  );
}

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container direction="row">
            <Typography
              component={Link}
              to="/"
              variant="h4"
              color="inherit"
              className={classes.title}
            >
              Undertiers
            </Typography>
            <UserContext.Consumer>
              {({ loggedIn, logOut }) => (
                <>
                  {loggedIn ? (
                    <Button
                      component={Link}
                      to="/boards/create"
                      className={classes.link}
                    >
                      New Board
                    </Button>
                  ) : null}
                  {loggedIn ? renderMyBoards(classes.link) : null}
                  {renderLogInLogOut(loggedIn, logOut, classes.link)}
                  {loggedIn ? null : renderRegister(classes.link)}
                </>
              )}
            </UserContext.Consumer>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
