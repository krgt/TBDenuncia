import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";


import { timelineDayStyle } from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

import classNames from "classnames/bind";

// in render()
function TimelineDay({ ...props }) {
  const { classes, date } = props;

  return (
    <div className={classes.dayContainer}>
      <div className={classNames(classes.day, classes.successCardHeader)}>
        25 de Abril de 2019
      </div>
    </div>
  );
}

export default withStyles(timelineDayStyle)(TimelineDay);