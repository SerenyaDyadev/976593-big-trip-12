const TRANSPORTS = {
  TAXI: `taxi`,
  BUS: `bus`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  TRAIN: `train`,
};

const PLACES = {
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

export const EVENT_TYPES = [
  TRANSPORTS,
  PLACES
];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};
