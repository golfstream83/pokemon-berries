import {BERRIES_ADD, BERRIES_INFO_ADD} from '../constants';

const doAddBerries = (berries) => ({
  type: BERRIES_ADD,
  berries,
});

const doAddBerriesInfo = (berriesInfo) => ({
  type: BERRIES_INFO_ADD,
  berriesInfo,
});

export {
  doAddBerries,
  doAddBerriesInfo,
};
