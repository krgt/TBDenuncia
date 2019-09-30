import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import ChartistGraph from "react-chartist";
import Chartist from "chartist";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { crimeDisplayConfig, chartMonthLabels } from "config.js";

var delays = 80,
  durations = 500;

const chartConfig = {
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 10,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    axisY: {
      onlyInteger: true
    }
  },
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

class CardCrimeStats extends React.Component {
  render() {
    const { classes, type, data, high } = this.props;
    const {icon, cardColor, statsTitle} = crimeDisplayConfig[type];

    const imgStyle = {
      width: "36px",
      height: "36px",
      padding: "10px",
      color: "#fff"
    };

    const chartData = {
      labels: chartMonthLabels,
      series: [data.numCrimesByMonth]
    };
    
    chartConfig.options.high = high;

    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card>
          <CardHeader style={{marginBottom: "40px", marginTop: "15px"}} color={cardColor} stats icon>
            <CardIcon style={{marginTop: "-30px"}} color={cardColor}>
              <img style={imgStyle} src={icon} />
            </CardIcon>
            <h4 className={classes.cardTitle}>{statsTitle}</h4>
            <h3 className={classes.cardTitle}>
              {data.numCrimes}  
            </h3>
          </CardHeader>
            <CardHeader style={{marginBottom: "15px", padding: "25px 0px 0px 0px"}} color={cardColor}>
              <ChartistGraph
                className="ct-chart"
                data={chartData}
                type="Line"
                options={chartConfig.options}
                listener={chartConfig.animation}
              />
            </CardHeader>
        </Card>
      </GridItem>
    )
  }
}

export default withStyles(dashboardStyle)(CardCrimeStats);