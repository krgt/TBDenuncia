import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
import robberyIcon from "assets/img/robbery.png";
import carTheftIcon from "assets/img/cartheft.png";
import womanStopIcon from "assets/img/womanstop.png";

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
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export {
  crimeDisplayConfig,
  crimeTypes,
  chartMonthLabels
};