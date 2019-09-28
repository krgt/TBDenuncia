import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ChartistGraph from "react-chartist";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { crimeDisplayConfig } from "config.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

class CardCrimeStats extends React.Component {
  render() {
    const { classes, type } = this.props;
    const {icon, cardColor, statsTitle} = crimeDisplayConfig[type];

    const imgStyle = {
      width: "36px",
      height: "36px",
      padding: "10px",
      color: "#fff"
    };

    return (
      <GridItem xs={12} sm={6} md={4}>
        <Card>
          <CardHeader style={{marginBottom: "40px", marginTop: "15px"}} color={cardColor} stats icon>
            <CardIcon style={{marginTop: "-30px"}} color={cardColor}>
              <img style={imgStyle} src={icon} />
            </CardIcon>
            <h4 className={classes.cardTitle}>{statsTitle}</h4>
            <h3 className={classes.cardTitle}>
              20
            </h3>
          </CardHeader>
            <CardHeader style={{marginBottom: "15px"}} color={cardColor}>
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
        </Card>
      </GridItem>
    )
  }
}

export default withStyles(dashboardStyle)(CardCrimeStats);