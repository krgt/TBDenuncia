import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CrimeTypeSelectItem from 'components/Crime/CrimeTypeSelectItem.jsx';
import { crimeTypes } from "config";

class ControlsTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crimeType: "assalto",
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) { return (event) => {
    this.setState({ [name]: event.target.value });
  }};

  render() {
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
              className: ''
            },
          }}
          margin="normal"
        >
          {crimeTypes.map(crimeType => (
            <MenuItem key={crimeType} value={crimeType}>
              <CrimeTypeSelectItem type={crimeType}/>
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export default ControlsTimeline;