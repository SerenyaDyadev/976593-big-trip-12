import {createElement} from "../dom-utils.js";
import {getSortDatesEndDaysForTemplate} from "../date-utils.js";

const createDayItems = (events) => {
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

const createListDays = (events) => {
  return (
    `<ul class="trip-days">
      ${createDayItems(events)}
    </ul>`
  );
};


export default class ListTripDays {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createListDays(this._events);
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
