import {createElement} from "../dom-utils.js";
import {getHoursMinutsStamp, getYearMonthDayStamp, getDurationTemplate} from "../date-utils.js";

const createOffersTemplates = (offers, offerPrices, maxOffersLength) => {

  offers.slice().sort(() => Math.random() - 0.5);

  const templateLength = offers.length > maxOffersLength ? maxOffersLength : offers.length;

  return new Array(templateLength).fill().map((element, index) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offers[index]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrices[index]}</span>
    </li>`
  ).join(` `);
};

const createEventItem = (event) => {
  const maxOffersLength = 3;
  const {eventType, destination, time, duration, price, offers, offerPrices} = event;
  const [startTime, endTime] = time;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
          <h3 class="event__title">${eventType} To ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${getYearMonthDayStamp(startTime)}>${getHoursMinutsStamp(startTime)}</time>
                        &mdash;
            <time class="event__end-time" datetime=${getYearMonthDayStamp(endTime)}>${getHoursMinutsStamp(endTime)}</time>
          </p>
          <p class="event__duration">${getDurationTemplate(duration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplates(offers, offerPrices, maxOffersLength)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventItem {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventItem(this._event);
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
