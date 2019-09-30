import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";

import CardCrimeStats from "components/Card/CardCrimeStats.jsx";

import { connect } from "react-redux";
import compose from 'recompose/compose';

import { crimeTypes } from "config";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const mapStateToProps = (state) => {
  return { crimes: state.estatisticasCrimes };
}

class Estatisticas extends React.Component {
  render() {
    const { crimes } = this.props;
    const { classes } = this.props;

    if (crimes == null) return null;

    return (
      <div>
        <GridContainer>
          {crimeTypes.map( (crimeType, index) => (
            <CardCrimeStats
              key={index}
              type={crimeType}
              data={crimes[crimeType]}
              high={crimes["high"]}
            />
          ))}
        </GridContainer>
      </div>
    );
  }
}

Estatisticas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(dashboardStyle),
  connect(mapStateToProps, null)
)(Estatisticas);