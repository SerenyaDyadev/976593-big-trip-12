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

  const duratuon = startTime - endTime;

  const days = moment.duration(duratuon).days() !== 0 ? moment.duration(duratuon, `d`).days() + `D` : ``;
  const hours = moment.duration(duratuon).hours() !== 0 ? moment.duration(duratuon).hours() + `H` : ``;
  const minutes = moment.duration(duratuon).minutes() !== 0 ? moment.duration(duratuon).minutes() + `M` : `0M`;

  return (days + hours + minutes);
};

export const sortByTime = (eventA, eventB) =>
  eventB.time[0].getDate() - eventA.time[0].getDate();

export const sortByPrice = (eventA, eventB) =>
  eventA.price - eventB.price;
