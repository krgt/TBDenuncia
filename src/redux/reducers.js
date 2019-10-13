import { FETCH_CRIMES, SET_MAPACRIMINAL_FILTERS } from "./actions";

import * as businessLogic from "./businessLogic";

const initialState = {
  crimes: [],
  crimesByType: {},
  mapaCriminalCrimes: [],
  mapaCriminalFilters: {
    crimeType: "all",
    hourInterval: [0, 23],
    dayMonthInterval: [1, 31],
    dayWeekInterval: [0, 6]
  },
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
  if (action.type === SET_MAPACRIMINAL_FILTERS) {
    const filters = action.payload;
    const newMapaCriminalCrimes = businessLogic.computeMapaCriminalCrimes(state.crimesByType, filters);

    return Object.assign({}, state, {mapaCriminalCrimes: newMapaCriminalCrimes});
  }
  return state;
}

export default rootReducer;