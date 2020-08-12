import {createEventItem} from "./event-item.js";
import {getDayMonthStamp, getYearMonthDayStamp} from "../date-utils.js";

const getEventsTemplate = (events, count, day) => {

  return new Array(count).fill().map((element, index) => {
    return day === getDayMonthStamp(events[index]) ? createEventItem(events[index]) : ``;
  }).join(` `);

};

export const createDayItem = (events, count) => {

  const daysForTemplate = {};
  for (let i = 1; i < events.length; i++) {
    let key = getDayMonthStamp(events[i]);
    daysForTemplate[key] = getYearMonthDayStamp(events[i]);
  }

  const days = Object.keys(daysForTemplate).sort();
  const dates = Object.values(daysForTemplate).sort();

  return new Array(days.length).fill().map((element, index) =>
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list">
        ${getEventsTemplate(events, count, days[index])}
      </ul>
    </li>`).join(` `);
};
