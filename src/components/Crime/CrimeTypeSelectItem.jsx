import React from "react";
import PropTypes from "prop-types";

import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";

import CrimeTypeSelectItemStyle from "assets/jss/material-dashboard-react/components/crimeTypeSelectItemStyle.jsx";

import classNames from "classnames/bind";

import { crimeDisplayConfig } from "config.js";

function CrimeTypeSelectItem({ ...props }) {
  const { classes, type } = props;

  if (type === "all") {
    return (
      <Box display="flex" alignItems="center">
        <span className={classes.tipoCrimeTag}>Sem Filtro</span>
      </Box>
    );
  }
  else {
    const {icon, bgColorClass, displayName} = crimeDisplayConfig[type];

    return (
      <Box display="flex" alignItems="center">
        <div className={classNames(classes.iconContainer, classes[bgColorClass])}>
          <img className={classes.icon} src={icon} />
        </div>
        <span className={classes.tipoCrimeTag}>{displayName}</span>
      </Box>
    );
  }
}

CrimeTypeSelectItem.propTypes = {
  type: PropTypes.oneOf(["all", "assalto", "estupro", "furto", "homicidio", "rouboVeiculo"])
};

export default withStyles(CrimeTypeSelectItemStyle)(CrimeTypeSelectItem);