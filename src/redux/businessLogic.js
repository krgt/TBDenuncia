import { crimeTypes } from "config";

function removeAccents(str) {
  let strAccents = str.split('');
  let strAccentsOut = new Array();
  let strAccentsLen = strAccents.length;
  let accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  let accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";

  for (let y = 0; y < strAccentsLen; y++) {
    if (accents.indexOf(strAccents[y]) != -1) {
      strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
    } else
      strAccentsOut[y] = strAccents[y];
  }

  strAccentsOut = strAccentsOut.join('');

  return strAccentsOut;
}

function findAddress(addressList, address) {
  return addressList.find( e => {
    return removeAccents(e.logradouro).toLowerCase() == removeAccents(address).toLowerCase();
  });
}

function swapRuaTravessa(address) {
  const words = address.split(' ');

  if (words[0].toLowerCase() === 'rua') {
    words[0] = 'Travessa';
  }
  else if (words[0].toLowerCase() === 'travessa') {
    words[0] = 'Rua';
  }

  return words.join(' ');
}

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

function computeTimelineCrimes(crimes, filters) {
  let dateA, dateB;

  return crimes.all.sort( (a, b) => {
    dateA = new Date(a.date + ' ' + a.time);
    dateB = new Date(b.date + ' ' + b.time);
    if (dateA < dateB)
      return 1;
    else if (dateA > dateB)
      return -1;
    return 0;
  })
}


function computeNewState(state, crimes) {
    const crimesByType = getCrimesByType(crimes);

    const mapaCriminalCrimes = crimes;
    const estatisticasCrimes = computeEstatisticasCrimes(crimesByType, state.estatisticasFilters);
    const timelineCrimes = computeTimelineCrimes(crimesByType, state.timelineFilters);

    return {
      crimes: crimes,
      crimesByType: crimesByType,
      mapaCriminalCrimes: mapaCriminalCrimes,
      estatisticasCrimes: estatisticasCrimes,
      timelineCrimes: timelineCrimes
    }
}

export {
  findAddress,
  swapRuaTravessa,
  computeNewState
}