import { crimeTypes } from "config";

const estatisticasFiltersConfig = {
  month: {
    groupingFunction: crime => {
      const date = new Date(crime.date);
      return date.getMonth();
    },
    arraySize: 12
  },
  week: {
    groupingFunction: crime => {
      const day = crime.date.split('-')[2];
      return parseInt(day/7);
    },
    arraySize: 5
  },
  day: {
    groupingFunction: crime => {
      const date = new Date(crime.date);
      return date.getDay();
    },
    arraySize: 7
  }
}

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


function filterByType(crimes, crimeType) {
  return crimes[crimeType];
}

function filterByHour(crimes, hourInterval) {
  return crimes.filter(crime => {
    const crimeHour = parseInt(crime.time.split(':')[0]);
    return crimeHour >= hourInterval[0] && crimeHour <= hourInterval[1];
  });
}

function filterByDayMonth(crimes, dayMonthInterval) {
  return crimes.filter(crime => {
    const crimeDayMonth = parseInt(crime.date.split('-')[2]);
    return crimeDayMonth >= dayMonthInterval[0] && crimeDayMonth <= dayMonthInterval[1];
  });
}

function filterByDayWeek(crimes, dayWeekInterval) {
  return crimes.filter(crime => {
    const crimeDayWeek = new Date(crime.date).getDay();
    return crimeDayWeek >= dayWeekInterval[0] && crimeDayWeek <= dayWeekInterval[1];
  });
}

function computeMapaCriminalCrimes(crimes, filters) {
  let result;

  result = filterByType(crimes, filters.crimeType);
  result = filterByHour(result, filters.hourInterval);
  result = filterByDayMonth(result, filters.dayMonthInterval);
  result = filterByDayWeek(result, filters.dayWeekInterval);

  return result;
}

function computeEstatisticasCrimeType(crimes, groupingFunction, arraySize) {
  const stats = {};

  stats.numCrimes = crimes.length;

  const numCrimesByGrouping = new Array(arraySize).fill(0);
  for (const crime of crimes) {
    const day = crime.date.split('-')[2];
    numCrimesByGrouping[groupingFunction(crime)]++;
  }

  stats.numCrimesByGrouping = numCrimesByGrouping;

  return stats;
}

function computeHigh(stats) {
  let high = 0;

  for (const crimeType of crimeTypes) {
    high = stats[crimeType].numCrimesByGrouping.reduce( (high, value) => {
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
  const { groupingFunction, arraySize } = estatisticasFiltersConfig[filters.chartType];

  for (const crimeType of crimeTypes) {
    stats[crimeType] =
      computeEstatisticasCrimeType(crimes[crimeType], groupingFunction, arraySize);
  }

  // highest value found (will be used when drawing chart)
  stats.high = computeHigh(stats);

  return stats
}

function computeTimelineCrimes(crimes, filters) {
  let dateA, dateB;

  const result = filterByType(crimes, filters.crimeType);

  return result.sort( (a, b) => {
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

    const mapaCriminalCrimes = computeMapaCriminalCrimes(crimesByType, state.mapaCriminalFilters);
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
  computeNewState,
  computeMapaCriminalCrimes,
  computeEstatisticasCrimes,
  computeTimelineCrimes,
}