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

function formatDate(date) {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
    'Outubro', 'Novembro', 'Dezembro'
  ];

  const dateSplit = date.split('-');
  const month = monthNames[dateSplit[1]-1];
  const day = dateSplit[2];

  return `${day} de ${month}`;
}

// in render()
function Timeline({ ...props }) {
  const {
    classes,
    crimes
  } = props;

  let previousDate = '';

  if (crimes == null) return null;

  return (
    <div className={classes.timelineContainer}>
      {crimes.map( (crime, index) => {
        let dayComponent = '';

        if (previousDate !== crime.date) {
          previousDate = crime.date;
          dayComponent = <TimelineDay date={formatDate(crime.date)}/>;
        }

        return (
          <div key={index}>
            {dayComponent}
            <TimelineEvent
              data={crime}
              orientation={index % 2 ? 'right': 'left'}
              />
          </div>
        )
      })}
    </div>
  );
}

export default compose(
  withStyles(timelineContainerStyle),
  connect(mapStateToProps, null)
)(Timeline);