import { crimeTypes } from "config";

function calcStatsCrimeType(crimeType, crimes) {
  crimesFiltered = crimes.filter( (crime) => {
    console.log(crime.crimeType);
    console.log(crimeType);
    console.log(crime.crimeType === crimeType);
    return crime.crimeType === crimeType;
  })

}

function calcStats(crimes, filters) {
  const stats = {};

  for (const crimeType of crimeTypes) {
    stats[crimeType] = calcStatsCrimeType(crimeType, crimes);
  }

  return stats
}

export {
  calcStats
}