import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.jsx";

const controlsStyle = theme => ({
  drawerPaper: {
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "30px",
    width: "200px",
    ...boxShadow,
  },
  titleContainer: {
    paddingTop: "10px",
    paddingBottom: "20px",
    marginBottom: "10px",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.3)"
    }
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    margin: "0",
    ...defaultFont,
    display: "block",
    fontSize: "18px",
    fontWeight: "400",
  }
});

export default controlsStyle;