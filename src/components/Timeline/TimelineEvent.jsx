import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

/*
import burglarIcon from "assets/img/burglar.png";
import chalkOutlineIcon from "assets/img/chalkoutline.png";
*/
import robberyIcon from "assets/img/robbery.png";

import timelineStyle from "assets/jss/material-dashboard-react/components/timelineStyle.jsx";

import classNames from "classnames/bind";

// in render()
function TimelineEvent({ ...props }) {
  const { classes, className, children, ...rest } = props;

  return (
    <div className={classes.eventContainer}>
      <div className={classNames(classes.iconContainer, classes.dangerCardHeader)}>
        <img className={classes.icon} src={robberyIcon} />
      </div>
      <div className={classes.eventCard}>
        <div className={classNames(classes.eventHeader, classes.dangerCardHeader)}>
          <h4 className={classes.cardTitleWhite}>Assalto</h4>
        </div>
        <p className={classNames(classes.eventTag2)}>
          12:25
        </p>
        <p className={classNames(classes.eventTag2)}>
          Av. Horácio Klabin, 777 - Centro
        </p>
        <div className={classes.eventDesc}>
          Loja assaltada durante o dia por dois indivíduos armados. Foram levados objetos e dinheiro.
        </div>
      </div>
    </div>
  );
}

export default withStyles(timelineStyle)(TimelineEvent);
