import {
  whiteColor,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  roseCardHeader,
  murderCardHeader,
  carTheftCardHeader
} from "assets/jss/material-dashboard-react.jsx";

const timelineContainerStyle = {
  timelineContainer: {
    position: "relative",
    width: "100%",
    "&:before": {
      top: "0",
      left: "27px",
      width: "3px",
      bottom: "0",
      content: "\" \"",
      position: "absolute",
      backgroundColor: "#E5E5E5",
      zIndex: "-1",
      "@media (min-width: 960px)": {
        left: "50%",
      }
    },
  }
}

const timelineDayStyle = {
  dayContainer: {
    marginTop: "20px",
    marginBottom: "40px",
    display: "flex",
    "@media (min-width: 960px)": {
      justifyContent: "center",
    },
  },
  day: {
    display: "inline-block",
    padding: "0 10px",
    color: whiteColor,
    borderRadius: "6px",
    fontSize: ".875rem",
  },
  successCardHeader,
}

const timelineEventStyle = {
  iconContainer: {
    borderRadius: "50%",
    "@media (min-width: 960px)": {
      margin: "0 20px",
      order: "1",
    }
  },
  icon: {
    display: "block",
    color: "#fff",
    width: "36px",
    height: "36px",
    padding: "10px",
    "@media (min-width: 960px)": {
      order: "1",
    },
  },
  eventContainer: {
    marginTop: "40px",
    display: "flex",
    alignItems: "flex-start",
    fontSize: ".875rem",
    textAlign: "justify",
  },
  eventContainerLeft: {
    "@media (min-width: 960px)": {
      "& div:nth-child(2)": {
        "&:before": {
          right: "auto",
          left: "100%",
          border: "15px solid transparent",
          borderLeftColor: "#e4e4e4",
        },
        "&:after": {
          left: "100%",
          border: "15px solid transparent",
          borderLeftColor: whiteColor,
        },
      },
    },
  },
  eventContainerRight: {
    "@media (min-width: 960px)": {
        flexDirection: "row-reverse",
    }
  },
  eventCard: {
    boxSizing: "border-box",
    marginLeft: "20px",
    position: "relative",
    backgroundColor: whiteColor,
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    width: "86%",
    padding: "15px",
    "&:before, &:after": {
      content: "\" \"",
      position: "absolute",
      right: "100%",
      width: "0",
      height: "0",
    },
    "&:before": {
      top: "15px",
      border: "15px solid transparent",
      borderRightColor: "#e4e4e4",
    },
    "&:after": {
      top: "16px",
      border: "14px solid transparent",
      borderRightColor: whiteColor,
    },
    "@media (min-width: 960px)": {
      width: "calc(50% - 48px)",
      marginLeft: "0px",
    },
  },
  eventTag: {
    display: "inline-block",
    borderRadius: "12px",
    color: whiteColor,
    padding: "5px 12px",
    fontSize: "10px",
    lineHeight: "1",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  eventTag2: {
    margin: "0px",
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: "700",
    color: "rgba(0,0,0,0.5)",
    lineHeight: "1.5em",
  },
  eventDesc: {
    marginTop: "10px",
  },
  eventHeader: {
    color: whiteColor,
    padding: "15px",
    marginTop: "-35px",
    borderRadius: "3px",
    marginBottom: "10px",
    "& h4, p": {
      margin: "0",
    },
  },

  warningCardHeader,
  dangerCardHeader,
  roseCardHeader,
  murderCardHeader,
  carTheftCardHeader
};

export {
  timelineContainerStyle,
  timelineDayStyle,
  timelineEventStyle
}