import {FilterType} from "../const";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.dateFrom > new Date()),
  [FilterType.PAST]: (events) => events.filter((event) => event.dateFrom < new Date()),
};
