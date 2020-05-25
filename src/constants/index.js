import {sortBy} from 'lodash';

export const PATH_BASE = 'https://pokeapi.co/api/v2/berry';
export const DEFAULT_LIMIT = '20';
export const DEFAULT_OFFSET = '0';
export const PARAM_LIMIT = 'limit=';
export const PARAM_OFFSET = 'offset=';
export const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENTS: (list) => sortBy(list, 'num_comments').reverse(),
  POINTS: (list) => sortBy(list, 'points').reverse(),
};
