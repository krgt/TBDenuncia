import { crimeTypes } from "config";

/*
  Input: A list with all crimes in the database.
  Output: An object with crimes grouped by crimeType.
*/
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

/*
  Input: A list of crimes of a given crimeType.
  Output: An object with the stats displayed at Estatisticas view for a given crimeType.
*/
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

function computeHigh(stats) {
  let high = 0;

  for (const crimeType of crimeTypes) {
    high = stats[crimeType].numCrimesByMonth.reduce( (high, value) => {
      return high > value ? high : value;
    }, high);
  }

  return high;
}

/*
  Input: An object with lists of crimes grouped by crimeType.
  Return: An object with the stats displayed at Estatisticas view for all crimeTypes
*/
function computeEstatisticasCrimes(crimes, filters) {
  const stats = {};

  for (const crimeType of crimeTypes) {
    stats[crimeType] = computeEstatisticasCrimeType(crimes[crimeType]);
  }

  // highest value found (will be used when drawing chart)
  stats.high = computeHigh(stats);

  return stats
}

function computeNewState(state, crimes) {
    const crimesByType = getCrimesByType(crimes);

    const mapaCriminalCrimes = crimes;
    const estatisticasCrimes = computeEstatisticasCrimes(crimesByType, state.estatisticasFilters);

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