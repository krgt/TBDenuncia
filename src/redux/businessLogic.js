import { crimeTypes } from "config";

function getCrimesByType(crimes) {
  const crimesByType = {}

  crimesByType.all = crimes;

  for (const crimeType of crimeTypes) {
    crimesByType[crimeType] = crimes.filter( (crime) => {
      return crime.crimeType === crimeType;
    })
  }

  return crimesByType;
}

function computeEstatisticasCrimeType(crimes) {
  const stats = {};

  stats.numCrimes = crimes.length;

  const numCrimesByMonth = new Array(12).fill(0);
  for (const crime of crimes) {
    const date = new Date(crime.date);
    const month = date.getMonth();
    numCrimesByMonth[month]++;
  }

  stats.numCrimesByMonth = numCrimesByMonth;

  return stats;
}

function computeEstatisticasCrimes(crimes, filters) {
  const stats = {};

  for (const crimeType of crimeTypes) {
    stats[crimeType] = computeEstatisticasCrimeType(crimes[crimeType]);
  }

  return stats
}

function computeNewState(state, crimes) {
    const crimesByType = getCrimesByType(crimes);

    const mapaCriminalCrimes = crimes;
    const estatisticasCrimes = computeEstatisticasCrimes(crimesByType, state.estatisticasFilters);
    console.log(estatisticasCrimes);

    return {
      crimes: crimes,
      crimesByType: crimesByType,
      mapaCriminalCrimes: mapaCriminalCrimes,
      estatisticasCrimes: estatisticasCrimes
    }
}

export {
  computeNewState
}