export function alphabeticalSort(data, alreadySorted) {
  const sortedData = data.sort(function(a, b) {
    var nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    if (nameA < nameB) return alreadySorted ? 1 : -1;
    if (nameA > nameB) return alreadySorted ? -1 : 1;
    return 0;
  });
  return sortedData;
}

export function tierSort(data, alreadySorted) {
  const sortedData = data.sort((a, b) =>
    alreadySorted ? a.tier - b.tier : b.tier - a.tier
  );
  return sortedData;
}

export function tierFilter(data, tier) {
  const filteredData = data.filter(unit => unit.tier === tier);
  if (tier >= 1 && tier <= 5) return filteredData;
  else return data;
}

export function allianceFilter(data, allianceMatch) {
  //const filteredData = data.filter(unit => unit.alliances.every(a => a.includes(alliance)));
  if (allianceMatch === "None")
    return data;
  const filteredData = data.filter(unit => unit.alliances.some(alliance => alliance.name ===  allianceMatch));
  return filteredData;
}
