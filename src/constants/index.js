import {sortBy} from 'lodash';

export const PATH_BASE = 'https://pokeapi.co/api/v2/berry';
export const DEFAULT_LIMIT = '20';
export const DEFAULT_OFFSET = '0';
export const PARAM_LIMIT = 'limit=';
export const PARAM_OFFSET = 'offset=';
export const SORTS = {
  NONE: (list) => list,
  NAME: (list) => sortBy(list, 'name'),
  GROWTH_TIME: (list) => sortBy(list, 'growth_time'),
  MAX_HARVEST: (list) => sortBy(list, 'max-harvest'),
  FIRMNESS: (list) => sortBy(list, [(el) => el.firmness.name]),
};
