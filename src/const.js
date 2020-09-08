export const EVENT_TYPES = [`taxi`, `bus`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`, `train`];

export const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];


export const OFFER_LIST = {
  "taxi": [`Order Uber`, `Taxi Minivan`, `Business Class`],
  "bus": [`Comfort Chair`, `Bisiness Chair`],
  "ship": [`Lux`],
  "transport": [`Comfort ticket`, `Bisiness ticket`],
  "drive": [`Motorbike`, `Sedan`, `MiniBus`],
  "flight": [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`],
  "check-in": [],
  "sightseeing": [],
  "restaurant": [`Two persons`, `Dinner`],
  "train": [`VIP`, `Tea`, `Comfort cupe`]
};

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
  MAJOR: `MAJOR`
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
