import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class ControlsEstatisticas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartType: "month"
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ chartType: event.target.value });
  }

  render() {
    return (
      <div >
        <FormControl component="fieldset" >
          <FormLabel component="legend">Tipo de Gráfico</FormLabel>
          <RadioGroup
            aria-label="Tipo de Gráfico"
            name="chartType"
            
            value={this.state.chartType}
            onChange={this.handleChange}
          >
            <FormControlLabel value="month" control={<Radio color="primary" />} label="Mês" />
            <FormControlLabel value="week" control={<Radio color="primary" />} label="Semana" />
            <FormControlLabel value="day" control={<Radio color="primary" />} label="Dia" />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

export default ControlsEstatisticas;