import {FilterType} from "../const";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.date_from > new Date()),
  [FilterType.PAST]: (events) => events.filter((event) => event.date_from < new Date()),
};
