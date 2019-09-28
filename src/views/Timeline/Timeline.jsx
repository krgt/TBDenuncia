import React from "react";
import TimelineDay from "components/Timeline/TimelineDay.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import timelineStyle from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

// in render()
function Timeline({ ...props }) {
  const {
    classes,
    className,
    children,
    ...rest
  } = props;

  return (
    <div className={classes.timelineContainer}>
      <TimelineDay/>
      <TimelineDay/>
    </div>
  );
}

export default withStyles(timelineStyle)(Timeline);
