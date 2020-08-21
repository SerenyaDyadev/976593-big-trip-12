import {createElement} from "../dom-utils.js";

const createDayItem = (date, day, index) => {

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${date}">${day.toUpperCase()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class DayItem {
  constructor(date, day, index) {
    this._date = date;
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayItem(this._date, this._day, this._index);
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
