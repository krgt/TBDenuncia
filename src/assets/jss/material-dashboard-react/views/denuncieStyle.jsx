import {
  blackColor,
  whiteColor,
  hexToRgb,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor,
  murderCardHeader,
  disabledCardHeader,
  carTheftCardHeader,
} from "assets/jss/material-dashboard-react.jsx";

const denuncieStyle = {
  tipoCrimeRadio: {
    borderRadius: "6px",
    margin: "0 10px",
    textAlign: "center",
    "& [type=radio]": {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0,
    },
    "& [type=radio] + div": {
      cursor: "pointer",
    },
    "& [type=radio]:checked + div": {
      outline: "2px solid #f00",
    },
  },

  iconContainer: {
    borderRadius: "6px",
  },

  icon: {
    display: "block",
    color: "#fff",
    width: "36px",
    height: "36px",
    padding: "10px",
  },

  tipoCrimeTag: {
    display: "inline-block",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#3c4858",
    lineHeight: "1.5em",
  },

  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  grayColor,
  murderCardHeader,
  disabledCardHeader,
};

export default denuncieStyle;
