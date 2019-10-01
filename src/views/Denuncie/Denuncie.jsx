import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import CrimeTypeSelectItem from 'components/Crime/CrimeTypeSelectItem.jsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

//import denuncieStyle from "assets/jss/material-dashboard-react/views/denuncieStyle.jsx";
import CoordinatesSelector from 'components/Denuncie/CoordinatesSelector.jsx';
import CpfInput from 'components/Denuncie/CpfInput.jsx';
import Button from "components/CustomButtons/Button.jsx";

import { connect } from "react-redux";
import compose from 'recompose/compose';
import { addCrime } from 'redux/actions';

import { getCurrentDate, getCurrentTime } from './dateFunctions';

import { mapBoxAccessToken } from 'config';

const crimeNames = ["assalto", "estupro", "furto", "homicidio", "rouboVeiculo"];

const expansionPanelDetailsStyle = {
  paddingTop: "5px",
  paddingBottom: "5px"
}

function mapDispatchToProps(dispatch) {
  return {
    addCrimeProp: crime => dispatch(addCrime(crime))
  }
}

class Denuncie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crimeType: 'assalto',
      crimeDescription: '',
      date: getCurrentDate(),
      time: getCurrentTime(),
      lngLat: null,
      cpf: {
        number: '000.000.000-00',
        error: false,
        label: "CPF",
        validInput: false
      }
    };

    this.onChangeLngLat = props.onChange;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  */

  handleChange(name) { return (event) => {
    this.setState({ [name]: event.target.value });
  }};

  handleSubmit(event) {
    this.props.addCrimeProp(this.state);
  }

  render() {
    return (
      <div>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Dados Obrigatórios
          </ExpansionPanelSummary>

          {/*Crime type selector*/}
          <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
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
              {crimeNames.map(crimeName => (
                <MenuItem key={crimeName} value={crimeName}>
                  <CrimeTypeSelectItem type={crimeName}/>
                </MenuItem>
              ))}
            </TextField>
          </ExpansionPanelDetails>

          {/* Coordinates selector */}
          <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
            <CoordinatesSelector
              container='map'
              style='mapbox://styles/mapbox/streets-v11'
              zoom={13}
              accessToken={mapBoxAccessToken}
              onChange={this.handleChange('lngLat')}
            />
          </ExpansionPanelDetails>

          {/* Date time selector */}
          <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
            <TextField
              id="date"
              label="Data"
              type="date"
              value={this.state.date}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              variant="outlined"
              style={{paddingRight: "10px"}}
              onChange={this.handleChange('date')}
            />

            <TextField
              id="time"
              label="Hora"
              type="time"
              margin="normal"
              value={this.state.time}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              variant="outlined"
              onChange={this.handleChange('time')}
            />
          </ExpansionPanelDetails>

          <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
            <CpfInput cpf={this.state.cpf} onChange={this.handleChange('cpf')}/>
          </ExpansionPanelDetails>

          <ExpansionPanelDetails style={expansionPanelDetailsStyle}>
            <TextField
              fullWidth
              id="descricaoCrime"
              label="Descreva o crime"
              value={this.state.crimeDescription}
              placeholder="Conte-nos o que aconteceu."
              margin="dense"
              variant="outlined"
              multiline
              rows="4"
              onChange={this.handleChange('crimeDescription')}
            />
          </ExpansionPanelDetails>

        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            Dados Opcionais
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <Button
          color="info"
          target="_blank"
          onClick={this.handleSubmit}
        >
          Enviar
        </Button>
      </div>
    )
  }
}

Denuncie.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(Denuncie);

/*
export default compose(
  withStyles(denuncieStyle),
  connect(null, mapDispatchToProps),
)(Denuncie);
*/