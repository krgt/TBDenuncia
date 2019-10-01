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



export function addCrime(payload) {
  //crimesRef.push().set(payload);

  // get address from lngLat
  axios.get(getMapBoxReverseGeocodingUrl(payload.lngLat))
  .then( response => {
    const address = response.data.features[0].text;
    const number = response.data.features[0].address;
    // mapbox address is incomplete, get complete address from Correios
    axios.get(getCorreiosCepUrl(address))
    .then( response => {
      // search for the correct address from the response from Correios
      payload.address = findAddress(response.data, address);
      payload.address.numero = number;
      console.log(payload.address);
    })
    .catch(errorFunc);
  })
  .catch(errorFunc);

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