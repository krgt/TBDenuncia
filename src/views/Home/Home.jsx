import React from "react";
import { NavLink } from "react-router-dom";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// in render()
function Home(props) {
  const {classes} = props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h4 className={classes.cardTitle}>TB Denúncia</h4>
              <h6 className={classes.cardCategory}>Denúncia e mapeamento de crimes.</h6>
              <p className={classes.description}>
                Utilize o menu para visualizar informações sobre denúncias.
              </p>
              <p className={classes.description}>
                Foi vítima de algum crime?
              </p>

              <NavLink
                to={"/denuncie"}
              >
                <Button color="primary" round>
                  Denuncie
                </Button>
              </NavLink>

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(Home);