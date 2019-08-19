import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { UserContext } from "../UserStore";
import { CreateBoard } from "../Login";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "10%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export default function BoardTextFields() {
  const classes = useStyles();
  const [values, setValues] = useState({
    multiline: "",
    title: ""
  });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const contextValue = useContext(UserContext);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    if (values.title === "" || values.multiline === "") {
      setError(true);
      setErrorText("Title and description cannot be blank!");
    } else if (values.title.length > 50) {
      setError(true);
      setErrorText("Title must be less than 50 characters!");
    } else CreateBoard(contextValue.user.id, values.title, values.multiline);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={onFormSubmit}
        >
          <TextField
            required
            error={error}
            id="outlined-required"
            label="Title"
            onChange={handleChange("title")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            helperText={errorText}
          />
          <TextField
            required
            error={error}
            id="outlined-multiline-static"
            label="Description"
            multiline
            fullWidth
            rows="4"
            className={classes.textField}
            value={values.multiline}
            onChange={handleChange("multiline")}
            margin="normal"
            variant="outlined"
            placeholder="Enter description here"
            helperText={errorText}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button onClick={onFormSubmit}>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
