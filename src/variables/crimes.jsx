import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
import robberyIcon from "assets/img/robbery.png";
import carTheftIcon from "assets/img/cartheft.png";
import womanStopIcon from "assets/img/womanstop.png";

const crimeDisplayConfig = {
  "assalto": {
    icon: robberyIcon,
    bgColorClass: classes.dangerCardHeader,
    displayName: "Assalto"
  },
  "estupro": {
    icon: womanStopIcon,
    bgColorClass: classes.roseCardHeader,
    displayName: "Estupro"
  },
  "furto": {
    icon: burglarIcon,
    bgColorClass: classes.warningCardHeader,
    displayName: "Furto"
  },
  "homicidio": {
    icon: chalkOutlineIcon,
    bgColorClass: classes.murderCardHeader,
    displayName: "Homicídio"
  },
  "rouboVeiculo": {
    icon: carTheftIcon,
    bgColorClass: classes.carTheftCardHeader,
    displayName: "Roubo de Veículo"
  },
};

const crimeNames = crimeDisplayConfig.keys();

export {
  crimeDisplayConfig,
  crimeNames
};