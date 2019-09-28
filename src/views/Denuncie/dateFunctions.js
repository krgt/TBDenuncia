function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function getCurrentDate() {
  let
    d = new Date(),
    month = addZero('' + (d.getMonth() + 1)),
    day = addZero('' + d.getDate()),
    year = d.getFullYear();

  return [year, month, day].join('-');
}

export function getCurrentTime() {
  let d = new Date();
  let
    h = addZero(d.getHours()),
    m = addZero(d.getMinutes());

  return [h, m].join(':');
}