import { crimesRef } from "./firebase";

export const ADD_CRIME = 'ADD_CRIME';
export const FETCH_CRIMES = 'FETCH_CRIMES';
export const NO_ACTION = 'NO_ACTION';


export function addCrime(payload) {
  crimesRef.push().set(payload);
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