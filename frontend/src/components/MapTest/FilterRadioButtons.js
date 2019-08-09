import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  title: {
    color: "white"
  }
}));

export default function FilterRadioButtons({ filterTier }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  function handleChange(event) {
    setValue(event.target.value);
    filterTier(parseInt(event.target.value, 10));
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.title}>
          Cost
        </FormLabel>
        <RadioGroup
          aria-label="Cost"
          name="cost"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="All" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="1" control={<Radio />} label="1" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
