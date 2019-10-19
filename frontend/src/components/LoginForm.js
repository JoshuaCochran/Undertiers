import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LogIn } from "./Login";
import { UserContext } from "./UserStore";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "rgba(13, 32, 43)",
      marginTop: "3%"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textbox: {
    backgroundColor: "rgba(12, 28, 37)",
    color: "white"
  },
  input: {
    color: "white"
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });
  const contextValue = useContext(UserContext);

  function setUserValue(event) {
    setUsername(event.target.value);
  }

  function setPassValue(event) {
    setPassword(event.target.value);
  }

  const onFormSubmit = event => {
    event.preventDefault();
    setErrors({ username: !Boolean(username), password: !Boolean(password) });
    if (username && password)
      LogIn(
        username,
        password,
        contextValue.setToken,
        contextValue.setLogin,
        contextValue.setUser
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color: "white"}}>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={setUserValue}
            error={errors.username}
            className={classes.textbox}
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={setPassValue}
            error={errors.password}
            className={classes.textbox}
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.input
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="white" />}
            label="Remember me"
            style={{color: "white"}}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onFormSubmit}
            type="submit"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
