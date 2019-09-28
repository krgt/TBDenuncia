import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}

    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function cpfValido(cpf) {	
  let add, rev, i;

	cpf = cpf.replace(/[^\d]+/g,'');	
  if (cpf == '') return false;	

	// Elimina CPFs invalidos conhecidos	
	if (
    cpf.length != 11 || 
    cpf == "00000000000" || 
    cpf == "11111111111" || 
    cpf == "22222222222" || 
    cpf == "33333333333" || 
    cpf == "44444444444" || 
    cpf == "55555555555" || 
    cpf == "66666666666" || 
    cpf == "77777777777" || 
    cpf == "88888888888" || 
    cpf == "99999999999"
  )
      return false;		

	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
      return false;		

	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
    return false;		

	return true;   
}

function CpfInput(props) {
  const handleChange = (event) => {
    const input = event.target.value;

    if (cpfValido(input))
      props.onChange({ target: {value: {
        number: event.target.value,
        error: false,
        label: "CPF",
        validInput: true 
      }}});
    else
      props.onChange({ target: {value: {
        number: event.target.value,
        error: true,
        label: "CPF",
        validInput: false
      }}});
  };

  return (
    <TextField
      error={props.cpf.error}
      helperText={props.cpf.error ? 'CPF Inválido.' : ''}
      label="CPF"
      margin="normal"
      value={props.cpf.number}
      onChange={handleChange}
      id="cpf-input"
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
      variant="outlined"
      onFocus={event => { event.target.select() }}
    />
  );
}

export default CpfInput;