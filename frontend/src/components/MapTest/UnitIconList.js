import React from "react";

const borderColors = {
  "1": "rgb(33, 48, 66)",
  "2": "rgb(21, 104, 49)",
  "3": "rgb(16, 64, 124)",
  "4": "rgb(137, 48, 136)",
  "5": "rgb(184, 157, 39)"
};
function renderUnit(unit, key) {
  return (
    <img
      key={key}
      src={unit.icon_url}
      alt={"Dota Underlords " + unit.name + " icon"}
      style={{
        width: "5vh",
        margin: "3px",
        border: "1px solid",
        borderColor: borderColors[unit.tier]
      }}
    />
  );
}

const UnitIconList = props => {
  if (props.units.length) {
    var unitList = [];
    props.units.forEach((item, key) => {
      unitList.push(renderUnit(item.unit, key));
    });
    return unitList;
  } else return null;
};

export default UnitIconList;
