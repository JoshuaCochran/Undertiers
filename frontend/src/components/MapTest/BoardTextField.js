import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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

export default function BoardTextFields({ input, submit, long }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    multiline: JSON.stringify(input).replace(/"/g, ""),
    title: JSON.stringify(input).replace(/"/g, "")
  });
  const [error, setError] = React.useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    var location;
    if (values.title === "" || values.multiline === "") setError(true);
    else if (long) {
      location = "DESCRIPTION";
      submit(values.multiline, location);
    } else {
      location = "TITLE";
      submit(values.title, location);
    }
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
          {long ? (
            <>
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
                helperText={error ? "Description cannot be blank!" : ""}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </>
          ) : (
            <>
              <TextField
                required
                error={error}
                id="outlined-required"
                label="Title"
                defaultValue={input}
                onChange={handleChange("title")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                helperText={error ? "Title cannot be blank!" : ""}
              />
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
