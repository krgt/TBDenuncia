import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import ControlsMapaCriminal from "components/Controls/ControlsMapaCriminal.jsx";
import ControlsEstatisticas from "components/Controls/ControlsEstatisticas.jsx";
import ControlsTimeline from "components/Controls/ControlsTimeline.jsx";
import controlsStyle from 'assets/jss/material-dashboard-react/components/controlsStyle.jsx';

const pathDisplayName = {
  "/mapacriminal": "Mapa Criminal",
  "/estatisticas": "Estatisticas",
  "/timeline": "Timeline",
}

function selectControl(currentPath) {
  if (currentPath === "/mapacriminal")
    return <ControlsMapaCriminal/>;
  if (currentPath === "/estatisticas")
    return <ControlsEstatisticas/>;
  if (currentPath === "/timeline")
    return <ControlsTimeline/>;
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const pathname = window.location.pathname;

    return (
      <Drawer
        anchor="right"
        variant="temporary"
        onClose={this.props.handleSettingsToggle}
        open={this.props.open}
        classes={{
          paper: this.props.classes.drawerPaper
        }}
      >
        <div className={classes.titleContainer}>
          <p className={classes.title}>Configuração</p>
          <p className={classes.title}>{pathDisplayName[pathname]}</p>
        </div>
        {selectControl(pathname)}
      </Drawer>
    );
  }
}

export default withStyles(controlsStyle)(Controls);