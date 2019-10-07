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
import Box from "@material-ui/core/Box";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

//import denuncieStyle from "assets/jss/material-dashboard-react/views/denuncieStyle.jsx";
import CoordinatesSelector from 'components/Denuncie/CoordinatesSelector.jsx';
import CpfInput from 'components/Denuncie/CpfInput.jsx';

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
    console.log(this.state);
  }};

  handleSubmit(event) {
    this.props.addCrimeProp(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Faça sua Denúncia</h4>
                <p className={classes.cardCategoryWhite}>Verifique antes em nossa timeline se o crime já não foi denunciado.</p>
              </CardHeader>

              <CardBody>
                <Box>
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
                </Box>

                  <Box>
                    <CoordinatesSelector
                      container='map'
                      style='mapbox://styles/mapbox/streets-v11'
                      zoom={13}
                      accessToken={mapBoxAccessToken}
                      onChange={this.handleChange('lngLat')}
                    />
                  </Box>

                  <Box>
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
                  </Box>

                  <Box>
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
                  </Box>

                  <Box display="block">
                    <CpfInput cpf={this.state.cpf} onChange={this.handleChange('cpf')}/>
                  </Box>

                  <Box>
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
                  </Box>
              </CardBody>

              <CardFooter>
                <Box>
                  <Button
                    color="primary"
                    target="_blank"
                    onClick={this.handleSubmit}
                  >
                    Enviar
                  </Button>
                </Box>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

Denuncie.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(Denuncie);