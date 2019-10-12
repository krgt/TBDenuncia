import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CrimeTypeSelectItem from 'components/Crime/CrimeTypeSelectItem.jsx';

import Button from "components/CustomButtons/Button.jsx";

import { crimeTypes } from "config";

class MapaCriminalControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crimeType: 'assalto',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.props.handleFixedClick();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    console.log(this.props.path);
    return (
      <div>
        <TextField
          id="outlined-select-crimeType"
          select
          label="Tipo do Crime"
          value={this.state.crimeType}
          onChange={this.handleChange('crimeType')}
          variant="outlined"
          SelectProps={{
            MenuProps: {
              className: '' //classes.menu,
            },
          }}
          margin="normal"
        >
          {crimeTypes.map(crimeName => (
            <MenuItem key={crimeName} value={crimeName}>
              <CrimeTypeSelectItem type={crimeName}/>
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default MapaCriminalControls;
