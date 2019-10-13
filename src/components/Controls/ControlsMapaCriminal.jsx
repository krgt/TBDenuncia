import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CrimeTypeSelectItem from 'components/Crime/CrimeTypeSelectItem.jsx';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { crimeTypes } from "config";
import { connect } from "react-redux";
import { setMapaCriminalFilters } from "redux/actions";

const marksHour = [
  {
    value: 0,
    label: '00'
  },
  {
    value: 6,
    label: '06'
  },
  {
    value: 12,
    label: '12'
  },
  {
    value: 18,
    label: '18'
  },
  {
    value: 23,
    label: '23'
  },
]

const marksDayMonth = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 10,
    label: "10"
  },
  {
    value: 20,
    label: "20"
  },
  {
    value: 31,
    label: "31"
  },
]

const marksDayWeek = [
  {
    value: 0,
    label: "Domingo"
  },
  {
    value: 3,
    label: "Quarta-feira"
  },
  {
    value: 6,
    label: "Sábado"
  },
]

const dayName = ["Domingo", "Segunda", "Terça",
  "Quarta", "Quinta", "Sexta", "Sábado"];

class ControlsMapaCriminal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crimeType: "all",
      hourInterval: [0, 23],
      dayMonthInterval: [1, 31],
      dayWeekInterval: [0, 6],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSliderChangeCommitted = this.handleSliderChangeCommitted.bind(this);
  }

  handleChange(name) { return (event) => {
    this.setState({ [name]: event.target.value });
 //   this.props.setMapaCriminalFilters(this.state);
  }};

  handleSliderChange(name) { return (event, newValue) => {
    this.setState({ [name]: newValue });
  }};

  handleSliderChangeCommitted() {
//    this.props.setMapaCriminalFilters(this.state);
  };

  componentDidUpdate() {
    this.props.setMapaCriminalFilters(this.state);
  }

  valueText(value) {
    return value;
  }
  
  render() {
    return (
      <div>
        <TextField
          id="outlined-select-crimeType"
          select
          label="Filtro por Tipo de Crime"
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

        <Typography id="hour-slider" gutterBottom>
          Hora
        </Typography>
        <Slider
          marks={marksHour}
          value={this.state.hourInterval}
          onChange={this.handleSliderChange('hourInterval')}
          onChangeCommitted={this.handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          aria-labelledby="hour-slider"
          getAriaValueText={this.valuetext}
          min={0}
          max={23}
        />

        <Typography id="dayMonth-slider" gutterBottom>
          Dia do mês
        </Typography>
        <Slider
          marks={marksDayMonth}
          value={this.state.dayMonthInterval}
          onChange={this.handleSliderChange('dayMonthInterval')}
          onChangeCommitted={this.handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          aria-labelledby="dayMonth-slider"
          getAriaValueText={this.valuetext}
          min={1}
          max={31}
        />

        <Typography id="dayWeek-slider" gutterBottom>
          Dia da semana
        </Typography>
        <Slider
          marks={marksDayWeek}
          value={this.state.dayWeekInterval}
          onChange={this.handleSliderChange('dayWeekInterval')}
          onChangeCommitted={this.handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          valueLabelFormat={(v, i) => {return dayName[v]}}
          aria-labelledby="dayWeek-slider"
          getAriaValueText={this.valuetext}
          min={0}
          max={6}
        />
      </div>
    );
  }
}

export default connect(null, { setMapaCriminalFilters })(ControlsMapaCriminal);