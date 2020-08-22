import {createElement} from "../dom-utils.js";
import {getYearMonthDayStamp, getDayMonthStamp} from "../date-utils";

const createDayItem = (date, index) => {
  const dateStamp = getYearMonthDayStamp(date);
  const dayStamp = getDayMonthStamp(date).toUpperCase();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${dateStamp}">${dayStamp}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day {
  constructor(date, index) {
    this._date = date;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayItem(this._date, this._index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getEventsList() {
    return this.getElement().querySelector(`.trip-events__list`);
  }

  removeElement() {
    this._element = null;
  }
}
