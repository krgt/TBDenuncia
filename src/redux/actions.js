import { crimesRef } from "./firebase";

import {
  getMapBoxReverseGeocodingUrl,
  getCorreiosCepUrl
} from "config";

import {
findAddress,
swapRuaTravessa,
} from "./businessLogic";

import axios from 'axios';

export const ADD_CRIME = 'ADD_CRIME';
export const FETCH_CRIMES = 'FETCH_CRIMES';
export const NO_ACTION = 'NO_ACTION';
export const SET_MAPACRIMINAL_FILTERS = 'SET_MAPACRIMINAL_FILTERS';


// This functions receives the data from the Denuncie form and
// pushes it into Firebase.
//
// We reverse-geocode lngLat into an address using MapBox and
// Correios API. Correios API is needed because MapBox doesn't
// give us the full address back.
export function addCrime(payload) {
  const packAddress = (address, correiosAddress) => {
    address.street = correiosAddress.logradouro;
    address.cityDivision = correiosAddress.bairro;
    address.city = correiosAddress.localidade;
    address.state = correiosAddress.uf;
    address.postalCode = correiosAddress.cep;
  };

  const errorFunc = payload => error => {
    console.log(`Could not fully resolve address for [${payload.lngLat}]. Partial data will be used.`);
    crimesRef.push().set(payload);
  };

  const address = {
    street: '',
    number: '',
    cityDivision: '',
    city: '',
    state: '',
    postalCode: ''
  }

  payload.address = address;

  // Get street name from Mapbox API
  axios.get(getMapBoxReverseGeocodingUrl(payload.lngLat))
  .then( response => {
    address.street = response.data.features[0].text;
    if (response.data.features[0].hasOwnProperty('address'))
      address.number = response.data.features[0].address;
    // get rest of address from Correios API
    axios.get(getCorreiosCepUrl(address.street))
    .then( response => {
      // If response is empty, try exchanging "Rua" for "Travessa" (vice-versa)
      if (response.data.length == 0) {
        const swappedStreet = swapRuaTravessa(address.street);

        axios.get(getCorreiosCepUrl(swappedStreet))
        .then( response => {
          const addressCorreios = findAddress(response.data, swappedStreet);
          packAddress(address, addressCorreios);
          crimesRef.push().set(payload);
        })
        .catch(errorFunc(payload));
      }
      // if reponse not empty, search for the correct address from the response from Correios
      else {
        const addressCorreios = findAddress(response.data, address.street);
        packAddress(address, addressCorreios);
        crimesRef.push().set(payload);
      }
    })
    .catch(errorFunc(payload));
  })
  .catch(errorFunc(payload))

  // Once we push the new crime, our firebase listener will be notified of the new data.
  // Thus we do not update the state manually, hence return NO_ACTION to reducer.
  return { type: NO_ACTION, payload };
};

export const fetchCrimes = () => async dispatch => {
  crimesRef.on("value", snapshot => {
    dispatch({
      type: FETCH_CRIMES,
      payload: snapshot.val() ? Object.values(snapshot.val()) : []
    });
  });
};

export function setMapaCriminalFilters(payload) {
  return { type: SET_MAPACRIMINAL_FILTERS, payload };
}; 