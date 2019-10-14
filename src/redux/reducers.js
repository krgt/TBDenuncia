import {
  FETCH_CRIMES,
  SET_MAPACRIMINAL_FILTERS,
  SET_ESTATISTICAS_FILTERS,
  SET_TIMELINE_FILTERS
}
from "./actions";

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
  estatisticasFilters: {chartType: "month"},
  timelineCrimes: [],
  timelineFilters: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === FETCH_CRIMES) {
    const newState = businessLogic.computeNewState(state, action.payload);
    return Object.assign({}, state, newState);
  }
  else if (action.type === SET_MAPACRIMINAL_FILTERS) {
    const filters = action.payload;
    const newMapaCriminalCrimes = businessLogic.computeMapaCriminalCrimes(state.crimesByType, filters);

    return Object.assign({}, state,
      {
        mapaCriminalCrimes: newMapaCriminalCrimes,
        mapaCriminalFilters: filters
      });
  }
  else if (action.type === SET_ESTATISTICAS_FILTERS) {
    const filters = action.payload;
    const newEstatisticasCrimes = businessLogic.computeEstatisticasCrimes(state.crimesByType, filters);

    return Object.assign({}, state,
      {
        estatisticasCrimes: newEstatisticasCrimes,
        estatisticasFilters: filters
      });
  }
  else if (action.type === SET_TIMELINE_FILTERS) {
    const filters = action.payload;
    const newTimelineCrimes = businessLogic.computeTimelineCrimes(state.crimesByType, filters);

    return Object.assign({}, state,
      {
        timelineCrimes: newTimelineCrimes,
        timelineFilters: filters
      });
  }

  return state;
}

export default rootReducer;