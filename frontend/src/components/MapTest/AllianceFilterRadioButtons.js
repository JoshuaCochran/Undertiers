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
    margin: theme.spacing(3),
    maxHeight: "50vh",
    overflow: "auto",
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  title: {
    color: "white"
  }
}));

export default function AllianceFilterRadioButtons({ filterAlliance }) {
  const classes = useStyles();
  const [value, setValue] = React.useState();

  function handleChange(event) {
    setValue(event.target.value);
    filterAlliance(event.target.value);
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.title}>
          Alliance
        </FormLabel>
        <RadioGroup
          aria-label="Alliance"
          name="Alliance"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="None" control={<Radio />} label="All" />
          <FormControlLabel value="Assassin" control={<Radio />} label="Assassin" />
          <FormControlLabel value="Blood-bound" control={<Radio />} label="Blood-bound" />
          <FormControlLabel value="Brawny" control={<Radio />} label="Brawny" />
          <FormControlLabel value="Deadeye" control={<Radio />} label="Deadeye" />
          <FormControlLabel value="Demon" control={<Radio />} label="Demon" />
          <FormControlLabel value="Demon Hunter" control={<Radio />} label="Demon Hunter" />
          <FormControlLabel value="Dragon" control={<Radio />} label="Dragon" />
          <FormControlLabel value="Druid" control={<Radio />} label="Druid" />
          <FormControlLabel value="Elusive" control={<Radio />} label="Elusive" />
          <FormControlLabel value="Heartless" control={<Radio />} label="Heartless" />
          <FormControlLabel value="Human" control={<Radio />} label="Human" />
          <FormControlLabel value="Hunter" control={<Radio />} label="Hunter" />
          <FormControlLabel value="Inventor" control={<Radio />} label="Inventor" />
          <FormControlLabel value="Knight" control={<Radio />} label="Knight" />
          <FormControlLabel value="Mage" control={<Radio />} label="Mage" />
          <FormControlLabel value="Primordial" control={<Radio />} label="Primordial" />
          <FormControlLabel value="Savage" control={<Radio />} label="Savage" />
          <FormControlLabel value="Scaled" control={<Radio />} label="Scaled" />
          <FormControlLabel value="Scrappy" control={<Radio />} label="Scrappy" />
          <FormControlLabel value="Shaman" control={<Radio />} label="Shaman" />
          <FormControlLabel value="Troll" control={<Radio />} label="Troll" />
          <FormControlLabel value="Warlock" control={<Radio />} label="Warlock" />
          <FormControlLabel value="Warrior" control={<Radio />} label="Warrior" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}