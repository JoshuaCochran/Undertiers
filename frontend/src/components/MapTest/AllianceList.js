import React, { useState } from "react";
import { getAllAlliances } from "../allianceCounting";
import AllianceCard from "./AllianceCard";

function renderAllianceCard(alliance) {
  return (
    <div key={alliance.name}>
      <AllianceCard alliance={alliance} />
    </div>
  );
}

export default function AllianceList({units}) {
  const [unitList, setUnitList] = useState([]);
  const [alliances, setAlliances] = useState([]);
  const [loaded, setLoaded] = useState(false);

  if (units !== unitList) {
    setLoaded(false);
    setUnitList(units);
  }

  if (!loaded && unitList.length) {
    setAlliances(getAllAlliances(units));
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
        allianceCards.push(renderAllianceCard(alliance));
    });
    return allianceCards;
  }
  return null;
}
