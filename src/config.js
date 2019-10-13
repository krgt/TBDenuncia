import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
import robberyIcon from "assets/img/robbery.png";
import carTheftIcon from "assets/img/cartheft.png";
import womanStopIcon from "assets/img/womanstop.png";

const mapBoxAccessToken = "pk.eyJ1Ijoia3JndDEwIiwiYSI6ImNqdmJueGVjdDB4YnU0ZXRkY203bnAzbXkifQ.uP4VDpQ1ycQKV2KaapeISg"

const getMapBoxReverseGeocodingUrl = lngLat => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${mapBoxAccessToken}&types=address`;
}

const getCorreiosCepUrl = rua => {
  return `https://viacep.com.br/ws/PR/Telemaco%20Borba/${rua}/json/`;
}

const crimeDisplayConfig = {
  "assalto": {
    icon: robberyIcon,
    bgColorClass: 'dangerCardHeader',
    displayName: "Assalto",
    cardColor: 'danger',
    statsTitle: "Assaltos"
  },
  "estupro": {
    icon: womanStopIcon,
    bgColorClass: 'roseCardHeader',
    displayName: "Estupro",
    cardColor: 'rose',
    statsTitle: "Estupros"
  },
  "furto": {
    icon: burglarIcon,
    bgColorClass: 'warningCardHeader',
    displayName: "Furto",
    cardColor: 'warning',
    statsTitle: "Furtos"
  },
  "homicidio": {
    icon: chalkOutlineIcon,
    bgColorClass: 'murderCardHeader',
    displayName: "Homicídio",
    cardColor: 'murder',
    statsTitle: "Homicídios"
  },
  "rouboVeiculo": {
    icon: carTheftIcon,
    bgColorClass: 'carTheftCardHeader',
    displayName: "Roubo de Veículo",
    cardColor: 'carTheft',
    statsTitle: "Roubos de Veículo"
  },
};

const crimeTypes = Object.keys(crimeDisplayConfig);

const chartMonthLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Oout",
  "Nov",
  "Dez"
];

export {
  mapBoxAccessToken,
  getMapBoxReverseGeocodingUrl,
  getCorreiosCepUrl,
  crimeDisplayConfig,
  crimeTypes,
  chartMonthLabels,
};