import {createEventItem} from "./event-item.js";
import {createElement} from "../dom-utils.js";
import {getDayMonthStamp, getSortDatesEndDaysForTemplate} from "../date-utils.js";

const getEventsTemplate = (events, count, day) => {

  return new Array(count).fill().map((element, index) => {
    return day === getDayMonthStamp(events[index].time[0]) ? createEventItem(events[index]) : ``;
  }).join(` `);
};

const createDayItems = (events, count) => {
  const {days, dates} = getSortDatesEndDaysForTemplate(events);

  return new Array(days.length).fill().map((element, index) =>
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list">
        ${getEventsTemplate(events, count, days[index])}
      </ul>
    </li>`).join(`\n`);
};

const createListDays = (events, count) => {
  return (
    `<ul class="trip-days">
      ${createDayItems(events, count)}
    </ul>`
  );
};


export default class ListTripDays {
  constructor(events, count) {
    this._events = events;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createListDays(this._events, this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
