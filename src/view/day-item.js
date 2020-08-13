import {createEventItem} from "./event-item.js";
import {getDayMonthStamp, getYearMonthDayStamp} from "../date-utils.js";
import {createElement2} from "../dom-utils.js";

const getEventsTemplate = (events, count, day) => {

  return new Array(count).fill().map((element, index) => {
    return day === getDayMonthStamp(events[index].time[0]) ? createEventItem(events[index]) : ``;
  }).join(` `);

};

const getSortDatesEndDaysForTemplate = (events) => {
  const daysForTemplate = {};
  for (let i = 0; i < events.length; i++) {
    let key = getDayMonthStamp(events[i].time[0]);
    daysForTemplate[key] = getYearMonthDayStamp(events[i].time[0]);
  }

  const days = Object.keys(daysForTemplate).sort();
  const dates = Object.values(daysForTemplate).sort();

  return {days, dates};
};

const createDayItems = (events) => {
  // console.log(events);
  const {days, dates} = getSortDatesEndDaysForTemplate(events);

  return new Array(days.length).fill().map((element, index) =>
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`).join(`\n`);
};

// ${ getEventsTemplate(events, count, days[index]) }
export default class DayItem {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    // console.log(createDayItems(this._events));
    return createDayItems(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement2(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
