import React from "react";
import UnitIcon from "./UnitIcon";

const UnitIconList = props => {
  if (props.units.length) {
    var unitList = [];
    props.units.forEach((item, key) => {
      unitList.push(<UnitIcon unit={item.unit} key={key}/>);
    });
    return unitList;
  } else return null;
};

export default UnitIconList;
