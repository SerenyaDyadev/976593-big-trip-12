import {FilterType} from "../const";

export const filter = {
  [FilterType.EVERITHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => event.date_from > new Date()),
  [FilterType.PAST]: (events) => events.filter((event) => event.date_from < new Date()),
};
