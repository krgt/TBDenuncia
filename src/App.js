import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.jsx";
import RTL from "layouts/RTL.jsx";

import { connect } from "react-redux";
import { fetchCrimes } from "redux/actions";

import "assets/css/material-dashboard-react.css?v=1.7.0";

const hist = createBrowserHistory();

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCrimes();
  }

  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { fetchCrimes })(App);