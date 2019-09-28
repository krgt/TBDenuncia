import { ADD_CRIME, FETCH_CRIMES } from "./actions";

import * as businessLogic from "./businessLogic";

const initialState = {
  crimes: [],
  stats: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_CRIME) {
    return state;
    /*
    return Object.assign({}, state, {
      crimes: state.crimes.concat(action.payload)
    });
      */
  }
  else if (action.type === FETCH_CRIMES) {
    const crimes = action.payload;

    console.log(businessLogic.calcStats(crimes));

    return Object.assign({}, state, {
      crimes: crimes,
      stats: businessLogic.calcStats(crimes)
    });
  }
  return state;
}

export default rootReducer;