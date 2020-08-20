import {createElement} from "../dom-utils.js";
import {getSortDatesEndDaysForTemplate} from "../date-utils.js";


const createListDays = (events) => {
  console.log(events);
  const {days, dates} = getSortDatesEndDaysForTemplate(events);
  console.log(dates);
  console.log(days);


  return new Array(days.length).fill().map((element, index) =>
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${dates[index]}">${days[index].toUpperCase()}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`).join(`\n`);
};

export default class ListDays {
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

    console.log(this._element);

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
