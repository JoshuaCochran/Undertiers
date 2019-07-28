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
  return filteredData;
}