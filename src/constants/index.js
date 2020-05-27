import {sortBy} from 'lodash';

export const SORTS = {
  NONE: (list) => list,
  NAME: (list) => sortBy(list, 'name'),
  GROWTH_TIME: (list) => sortBy(list, 'growth_time'),
  MAX_HARVEST: (list) => sortBy(list, 'max-harvest'),
  FIRMNESS: (list) => sortBy(list, [(el) => el.firmness.name]),
};

export const BERRIES_ADD = 'BERRIES_ADD';
export const BERRIES_FETCH_ERROR = 'BERRIES_FETCH_ERROR';
export const BERRIES_INFO_ADD = 'BERRIES_INFO_ADD';
export const BERRIES_INFO_FETCH_ERROR = 'BERRIES_INFO_FETCH_ERROR';
