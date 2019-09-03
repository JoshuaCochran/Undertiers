import React, { useState } from "react";
import { getAllAlliances } from "../allianceCounting";
import AllianceCard from "./AllianceCard";

function renderAllianceCard(alliance, isSmall) {
  if (isSmall) {
    return (
      <img key={alliance.id}
        src={alliance.icon_url}
        alt={"Dota Underlords " + alliance.name + " icon"}
        style={{width: "35px"}}
      />
    );
  } else
    return (
      <div key={alliance.name}>
        <AllianceCard alliance={alliance} />
      </div>
    );
}

const AllianceList = props => {
  const [unitList, setUnitList] = useState([]);
  const [alliances, setAlliances] = useState([]);
  const [loaded, setLoaded] = useState(false);

  if (props.units !== unitList) {
    setLoaded(false);
    setUnitList(props.units);
  }

  if (!loaded && unitList.length) {
    setAlliances(getAllAlliances(props.units));
    setLoaded(true);
    return <p>Loading..</p>;
  } else if (alliances.length) {
    var allianceCards = [];
    alliances.forEach(alliance => {
      if (
        alliance.name === "Demon"
          ? alliance.count === alliance.min_units
          : alliance.count >= alliance.min_units
      )
        allianceCards.push(renderAllianceCard(alliance, props.isSmall));
    });
    return allianceCards;
  }
  return null;
};

export default AllianceList;
