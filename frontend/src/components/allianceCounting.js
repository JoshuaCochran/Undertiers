export function getUniqueAlliances(units) {
  var alliances = [];
  units.forEach(piece => {
    piece.unit.alliances.forEach(alliance => alliances.push(alliance));
  });
  alliances = Array.from(new Set(alliances));
  return alliances;
}

export function getAlliance(units, allianceToGet) {
  const alliances = getUniqueAlliances(units);
  const result = alliances.filter(alliance => alliance.name === allianceToGet);
  var active = false;

  if (
    Array.isArray(result) &&
    result.length &&
    (allianceToGet === "Demon"
      ? result.length === result[0].min_units
      : result.length >= result[0].min_units)
  )
    active = true;
  if (active) {
    console.log(
      "There are " +
        result.length +
        " unique " +
        allianceToGet +
        "s on the board."
    );
    console.log(
      allianceToGet +
        " bonus " +
        Math.floor(result.length / result[0].min_units) +
        " active."
    );
  }
}

export function getAllAlliances(units, unitsOnMap) {
  var alliances = [];
  units.forEach(piece => {
    piece.alliances.forEach(alliance => {
      if (!alliances.includes(alliance.name)) alliances.push(alliance.name);
    });
  });
  alliances.forEach(alliance => getAlliance(unitsOnMap, alliance));
}
