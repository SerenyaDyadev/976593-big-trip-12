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

export const getDurationTemplate = (minutesDuration) => {
  const oneHourInMinutes = 60;
  const oneDayInHours = 24;
  const minLengthTimeStamp = 2;
  const hoursDuration = minutesDuration / oneHourInMinutes;

  let days = Math.floor(hoursDuration / oneDayInHours) + `D` !== `0D`
    ? Math.floor(hoursDuration / oneDayInHours) + `D`
    : ``;

  days = days.length === minLengthTimeStamp
    ? `0` + days
    : days;

  let hours = Math.floor(hoursDuration % oneDayInHours) + `H` !== `0H`
    ? Math.floor(hoursDuration % oneDayInHours) + `H`
    : ``;

  hours = hours.length === minLengthTimeStamp
    ? `0` + hours
    : hours;

  const mins = Math.floor(minutesDuration % oneHourInMinutes) + `M`;

  return (days + hours + mins);
};

export const getSortDatesEndDaysForTemplate = (events) => {
  const daysForTemplate = {};
  for (let i = 0; i < events.length; i++) {
    let key = getDayMonthStamp(events[i].time[0]);
    daysForTemplate[key] = getYearMonthDayStamp(events[i].time[0]);
  }

  const days = Object.keys(daysForTemplate).sort();
  const dates = Object.values(daysForTemplate).sort();

  return {days, dates};
};
