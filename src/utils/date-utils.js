import moment from "moment";

export const getFullDateForTeplate = (date) => {
  return date.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`});
};

export const getDayMonthStamp = (event) => {
  return event.toLocaleString(`en-GB`, {day: `2-digit`, month: `short`});
};

export const getYearMonthDayStamp = (event) => {
  return event.toLocaleString(`fr-CA`, {year: `numeric`, month: `2-digit`, day: `2-digit`});
};

export const getMonthStamp = (event) => {
  return event.toLocaleString(`en-GB`, {month: `short`});
};

export const getDayStamp = (event) => {
  return event.toLocaleString(`en-GB`, {day: `2-digit`});
};

export const getHoursMinutsStamp = (date) => {
  return date.toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`});
};

export const getDurationTemplate = (startTime, endTime) => {
  if (!(startTime instanceof Date) || !(endTime instanceof Date)) {
    return ``;
  }

  const hasZero = (item) => {
    return item.length !== 0 && item.length < 3 ? `0` + item : item;
  };

  const duration = startTime - endTime;

  const days = moment.duration(duration).days() !== 0 ? moment.duration(duration).days() + `D` : ``;
  const hours = moment.duration(duration).hours() !== 0 ? moment.duration(duration).hours() + `H` : ``;
  const minutes = moment.duration(duration).minutes() !== 0 ? moment.duration(duration).minutes() + `M` : `M`;

  return (`${hasZero(days)} ${hasZero(hours)} ${hasZero(minutes)}`);
};

export const sortByTime = (eventA, eventB) =>
  eventB.dateFrom.getDate() - eventA.dateFrom.getDate();

export const sortByPrice = (eventA, eventB) =>
  eventB.price - eventA.price;

export const sortByEvent = (eventA, eventB) => {
  if (eventA.dateFrom > eventB.dateFrom) {
    return 1;
  } else if (eventA.dateFrom < eventB.dateFrom) {
    return -1;
  }

  return 0;
};

export const isTimeChange = (dateA, dateB) => {
  return dateA === dateB ? true : false;
};
