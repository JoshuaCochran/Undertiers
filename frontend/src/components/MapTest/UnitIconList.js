import React from "react";
import UnitIcon from "./UnitIcon";

const UnitIconList = props => {
  if (props.units && props.units.length) {
    var unitList = [];
    props.units.forEach((item, key) => {
      unitList.push(<UnitIcon unit={item.unit ? item.unit : item} key={key}/>);
    });
    return unitList;
  } else return null;
};

export default UnitIconList;
