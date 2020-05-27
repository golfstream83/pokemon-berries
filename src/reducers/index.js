import {combineReducers} from 'redux';
import berriesReducer from './berriesReducer';
import berriesInfoReducer from './berriesInfoReducer';

const rootReducer = combineReducers({
  berriesInfoState: berriesInfoReducer,
  berriesState: berriesReducer,
});

export default rootReducer;
