import { ADD_CRIME, FETCH_CRIMES } from "./actions";

import * as businessLogic from "./businessLogic";

const initialState = {
  crimes: [],
  mapaCriminalCrimes: [],
  mapaCriminalFilters: {},
  estatisticasCrimes: [],
  estatisticasFilters: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_CRIME) {
    return state;
  }
  else if (action.type === FETCH_CRIMES) {
    const newState = businessLogic.computeNewState(state, action.payload);
    return Object.assign({}, state, newState);
  }
  return state;
}

export default rootReducer;