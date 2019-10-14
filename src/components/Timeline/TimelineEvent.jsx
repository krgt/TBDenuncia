import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
import robberyIcon from "assets/img/robbery.png";

import { timelineEventStyle } from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

import classNames from "classnames/bind";

import { crimeDisplayConfig } from "config.js";

// in render()
function TimelineEvent({ ...props }) {
  const { classes, data, orientation } = props;

  const {icon, bgColorClass, displayName} = crimeDisplayConfig[data.crimeType];

  let street, noAddressMsg;

  if (data.address.street) {
    street = data.address.street;
    noAddressMsg = '';
  }
  else {
    street = `Coordenadas: [${data.lngLat}]`;
    noAddressMsg = 'Local sem endereço.';
  }

  let cityDivision = data.address.cityDivision ? ` - ${data.address.cityDivision}` : '';

  const orientationClass = orientation === 'left'
    ? classes.eventContainerLeft
    : classes.eventContainerRight;

  return (
    <div className={classNames(classes.eventContainer, orientationClass)}>
      <div className={classNames(classes.iconContainer, classes[bgColorClass])}>
        <img className={classes.icon} src={icon} />
      </div>
      <div className={classes.eventCard}>
        <div className={classNames(classes.eventHeader, classes[bgColorClass])}>
          <h4 className={classes.cardTitleWhite}>{displayName}</h4>
        </div>
        <p className={classNames(classes.eventTag2)}>
          {data.time}
        </p>
        <p className={classNames(classes.eventTag2)}>
          {noAddressMsg}
        </p>
        <p className={classNames(classes.eventTag2)}>
          {street}{cityDivision}
        </p>
        <div className={classes.eventDesc}>
          {data.crimeDescription ? data.crimeDescription : ""}
        </div>
      </div>
    </div>
  );
}

export default withStyles(timelineEventStyle)(TimelineEvent);