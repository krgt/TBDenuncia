import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import MapaCriminalControls from "./MapaCriminalControls.jsx";

import Button from "components/CustomButtons/Button.jsx";

class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleFixedClick();
  }

  render() {
    return (
      <div
        className={classnames("fixed-plugin", {
          "rtl-fixed-plugin": this.props.rtlActive
        })}
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>
          <div onClick={this.handleClick}>
            <i className="fa fa-cog fa-2x" />
          </div>
          <ul className="dropdown-menu">
            <li className="header-title">Configurações de Exibição</li>
            <li className="adjustments-line" />
          </ul>
        </div>
      </div>
    );
  }
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};

export default FixedPlugin;
