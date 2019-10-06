import { ADD_CRIME, FETCH_CRIMES } from "./actions";

import * as businessLogic from "./businessLogic";

const initialState = {
  crimes: [],
  mapaCriminalCrimes: [],
  mapaCriminalFilters: {},
  estatisticasCrimes: null,
  estatisticasFilters: {},
  timelineCrimes: [],
  timelineFilters: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === FETCH_CRIMES) {
    const newState = businessLogic.computeNewState(state, action.payload);
    return Object.assign({}, state, newState);
  }
  return state;
}

export default rootReducer;