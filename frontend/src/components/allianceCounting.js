export function getUniqueAlliances(units) {
  var alliances = [];
  units.forEach(piece => {
    piece.unit.alliances.forEach(alliance => alliances.push(alliance));
  });
  alliances = Array.from(new Set(alliances));
  return alliances;
}

export function getUniqueUnits(units) {
  const result = units.filter((item, index) => {
    return (
      index ===
      units.findIndex(obj => {
        return JSON.stringify(obj.unit) === JSON.stringify(item.unit);
      })
    );
  });
  return result;
}

export function getAlliance(units, allianceToGet) {
  const alliances = getUniqueAlliances(units);
  const result = alliances.filter(alliance => alliance.name === allianceToGet);

  result[0].count = result.length;
  return result[0];
}

export function getAllAlliances(units) {
  var alliances = [];
  const uniqueUnits = getUniqueUnits(units);
  uniqueUnits.forEach(piece => {
    piece.unit.alliances.forEach(alliance => {
      if (!alliances.includes(alliance.name)) alliances.push(alliance.name);
    });
  });
  var result = [];
  alliances.forEach(alliance => result.push(getAlliance(uniqueUnits, alliance)));
  return result;
}
