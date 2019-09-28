import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

/*
import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
*/
import robberyIcon from "assets/img/robbery.png";

import timelineStyle from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

import classNames from "classnames/bind";

import TimelineEvent from "components/Timeline/TimelineEvent.jsx";

// in render()
function TimelineDay({ ...props }) {
  const { classes, className, children, ...rest } = props;

  return (
    <div className={classes.container}>
      <div className={classes.dayContainer}>
        <div className={classNames(classes.day, classes.successCardHeader)}>
          25 de Abril de 2019
        </div>
      </div>

      <TimelineEvent crimeType="assalto"/>
      <TimelineEvent crimeType="furto"/>
      <TimelineEvent/>
    </div>
  );
}

export default withStyles(timelineStyle)(TimelineDay);