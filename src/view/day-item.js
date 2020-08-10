import {createEventItem} from "./event-item.js";

const getEventsTemplate = (events, count, day) => {

  let template = [];
  for (let i = 1; i < count; i++) {
    if (day === events[i].time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`})) {
      template.push(createEventItem(events[i]));
    }
  }

  return template.join(` `);
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
    const template = [];
    for (let i = 0; i < days.length; i++) {
      const dayStamp = days[i].toUpperCase();
      const dateStamp = dates[i];
      template.push(`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount + i}</span>
        <time class="day__date" datetime="${dateStamp}">${dayStamp}</time>
      </div>
      <ul class="trip-events__list">
      ${getEventsTemplate(events, EVENT_COUNT, days[i])}
      </ul>
    </li>`);
    }

    return template.join(` `);
  };

  return templateDays();
};
