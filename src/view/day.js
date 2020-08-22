import AbstractView from "./abstract.js";
import {getYearMonthDayStamp, getDayMonthStamp} from "../utils/date-utils.js";

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

export default class Day extends AbstractView {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayItem(this._date, this._index);
  }

  getEventsList() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
