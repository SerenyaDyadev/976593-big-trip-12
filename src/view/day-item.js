import {createEventItem} from "./event-item.js";

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

const getEventsTemplate = (events, EVENT_COUNT, day) => {
  let template = [];

  for (let i = 1; i < EVENT_COUNT; i++) {
    if (day === events[i].time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`})) {
      template.push(createEventItem(events[i]));
    }
  }

  return template.join(` `);
};

export const createDayItem = (events, EVENT_COUNT) => {

  let days = [];
  for (let i = 1; i < events.length; i++) {
    days.push(events[i].day);
  }
  days = unique(days).sort();

  // const dateStamp = time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`}).toUpperCase();
  // const dayStamp = time[0].toLocaleString(`fr-CA`, {year: `numeric`, month: `2-digit`, day: `2-digit`});

  const templateDays = () => {
    let dayCount = 1;
    const template = [];
    for (let i = 0; i < days.length; i++) {
      const dateStamp = days[i].toUpperCase();
      template.push(`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount + i}</span>
        <time class="day__date" datetime="$dayStamp">${dateStamp}</time>
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
