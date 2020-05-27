import {BERRIES_INFO_ADD, BERRIES_INFO_FETCH_ERROR} from '../constants';

const INITIAL_STATE = {
  berriesInfo: {
    next: '',
    results: [],
  },
  error: null,
};

function berriesInfoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BERRIES_INFO_ADD:
      return {
        ...state,
        berriesInfo: {
          next: action.berriesInfo.next,
          results: [...state.berriesInfo.results, ...action.berriesInfo.results],
        },
      };
    case BERRIES_INFO_FETCH_ERROR:
      return {berriesInfo: {}, error: action.error};
    default:
      return state;
  }
}

export default berriesInfoReducer;
