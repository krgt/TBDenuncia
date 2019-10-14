import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CrimeTypeSelectItem from 'components/Crime/CrimeTypeSelectItem.jsx';
import { crimeTypes } from "config";
import { connect } from "react-redux";
import { setTimelineFilters } from "redux/actions";

const mapStateToProps = (state) => {
  return {
    filters: state.timelineFilters
  };
}

class ControlsTimeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crimeType: props.filters.crimeType,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) { return (event) => {
    this.setState({ [name]: event.target.value });
  }};

  componentDidUpdate() {
    this.props.setTimelineFilters(this.state);
  }

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
          <MenuItem key="all" value="all">
            <CrimeTypeSelectItem type="all"/>
          </MenuItem>
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

export default connect(mapStateToProps, { setTimelineFilters })(ControlsTimeline);