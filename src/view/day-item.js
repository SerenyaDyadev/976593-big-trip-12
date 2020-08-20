import {createElement} from "../dom-utils.js";
import {getSortDatesEndDaysForTemplate} from "../date-utils.js";

const createDayItem = (events, index) => {
  // console.log(events);
  const {days, dates} = getSortDatesEndDaysForTemplate(events);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list">${createEventItem(events[0])}</ul>
    </li>`
  );
};

export default class DayItem {
  constructor(events, index) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createDayItem(this._events);
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
