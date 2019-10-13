import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import rootMiddleware from "./middleware";
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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

const store = createStore(rootReducer, initialState, storeEnhancers(applyMiddleware(rootMiddleware, thunk)));

export default store;