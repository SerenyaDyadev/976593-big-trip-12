import {createEventItem} from "./event-item.js";

const getEventsTemplate = (events, count, day) => {

  const template = new Array(count).fill().map((element, index) => {
    return day === events[index].time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`}) ? createEventItem(events[index]) : ``;
  }).join(` `);

  return template;
};

export const createDayItem = (events, EVENT_COUNT) => {

  const daysForTemplate = {};
  for (let i = 1; i < events.length; i++) {
    let key = events[i].time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`});
    daysForTemplate[key] = events[i].time[0].toLocaleString(`fr-CA`, {year: `numeric`, month: `2-digit`, day: `2-digit`});
  }

  const days = Object.keys(daysForTemplate).sort();
  const dates = Object.values(daysForTemplate).sort();

  const templateDays = () => {
    let dayCount = 1;
    const template = new Array(days.length).fill().map((element, index) => `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount + index}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list">
      ${getEventsTemplate(events, EVENT_COUNT, days[index])}
      </ul>
    </li>`).join(` `);

    return template;
  };

  return templateDays();
};
