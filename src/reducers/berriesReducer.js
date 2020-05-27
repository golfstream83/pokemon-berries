import {BERRIES_ADD, BERRIES_FETCH_ERROR} from '../constants';

const INITIAL_STATE = {
  berries: [],
  error: null,
};

function berriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BERRIES_ADD:
      return {...state, berries: [...state.berries, ...action.berries]};
    case BERRIES_FETCH_ERROR:
      return {berries: [], error: action.error};
    default:
      return state;
  }
}

export default berriesReducer;
