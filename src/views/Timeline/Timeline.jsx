import React from "react";
import TimelineDay from "components/Timeline/TimelineDay.jsx";
import TimelineEvent from "components/Timeline/TimelineEvent.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { timelineContainerStyle } from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

import { connect } from "react-redux";
import compose from 'recompose/compose';

const mapStateToProps = (state) => {
  return { crimes: state.timelineCrimes };
}

// in render()
function Timeline({ ...props }) {
  const {
    classes,
    crimes
  } = props;

  if (crimes == null) return null;

  return (
    <div className={classes.timelineContainer}>
      {crimes.map( (crime, index) => (
        <TimelineEvent key={index} data={crime}/>
      ))}
      <TimelineDay/>
    </div>
  );
}

export default compose(
  withStyles(timelineContainerStyle),
  connect(mapStateToProps, null)
)(Timeline);