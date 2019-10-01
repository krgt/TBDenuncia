import { crimesRef } from "./firebase";

import {
  getMapBoxReverseGeocodingUrl,
  getCorreiosCepUrl
} from "config";

import { findAddress } from "./businessLogic";

import axios from 'axios';

export const ADD_CRIME = 'ADD_CRIME';
export const FETCH_CRIMES = 'FETCH_CRIMES';
export const NO_ACTION = 'NO_ACTION';

const errorFunc = error => {
  console.log(error);
  alert("Erro ao buscar endereço");
}

function swapRuaTravessa(address) {
  const words = address.split(' ');

  if (words[0].toLowerCase() === 'rua') {
    words[0] = 'Travessa';
  }
  else if (words[0].toLowerCase() === 'travessa') {
    words[0] = 'Rua';
  }

  return words.join(' ');
}

export function addCrime(payload) {
  //crimesRef.push().set(payload);

  // get address from lngLat
  axios.get(getMapBoxReverseGeocodingUrl(payload.lngLat))
  .then( response => {
    let address = response.data.features[0].text;
    const number = response.data.features[0].address;
    // mapbox address is incomplete, get complete address from Correios
    axios.get(getCorreiosCepUrl(address))
    .then( response => {
      // if response is empty, try exchanging "Rua" for "Travessa" (vice-versa)
      if (response.data.length == 0) {
        address = swapRuaTravessa(address);
        axios.get(getCorreiosCepUrl(address))
        .then( response => {
          payload.address = findAddress(response.data, address);
          console.log(response.data);
          console.log(address);
          console.log(payload.address);
          payload.address.numero = number;
          console.log(payload.address);
        })
        .catch(errorFunc);
      }
      // if reponse not empty, search for the correct address from the response from Correios
      else {
        payload.address = findAddress(response.data, address);
        payload.address.numero = number;
        console.log(payload.address);
      }
    })
    .catch(errorFunc);
  })
  .catch(errorFunc);

  // Once we push the new crime, our firebase listener will be notified of the new data.
  // Thus we do not update the state manually, hence return NO_ACTION to reducer.
  return { type: NO_ACTION, payload }
};

export const fetchCrimes = () => async dispatch => {
  crimesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_CRIMES,
      payload: snapshot.val() ? Object.values(snapshot.val()) : []
    });
  });
};