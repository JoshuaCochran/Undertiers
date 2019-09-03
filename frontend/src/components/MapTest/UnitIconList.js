import React from "react";

function renderUnit(unit) {
  return (
    <img
      key={unit.id}
      src={unit.icon_url}
      alt={"Dota Underlords " + unit.name + " icon"}
      style={{width: "5vh"}}
    />
  );
}

const UnitIconList = props => {
    if (props.units.length)
    {
        var unitList = [];
        props.units.forEach(item => {
            unitList.push(renderUnit(item.unit));
        })
        return unitList;
    }
    else
        return null;
};

export default UnitIconList;
