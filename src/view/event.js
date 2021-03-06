import he from "he";
import AbstractView from "./abstract.js";
import {Transports} from "../const.js";
import {getHoursMinutsStamp, getYearMonthDayStamp, getDurationTemplate} from "../utils/date-utils.js";

const createOffersTemplates = (offers, maxOffersLength) => {
  if (!offers) {
    return ``;
  }

  const templateLength = offers.length > maxOffersLength ? maxOffersLength : offers.length;

  return new Array(templateLength).fill().map((element, index) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offers[index].title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offers[index].price}</span>
    </li>`
  ).join(` `);
};

const createEventItem = (event) => {
  const maxOffersLength = 3;
  const {eventType, destination, price, offers, dateFrom: startTime, dateTo: endTime} = event;

  const isCheckEventType = Object.values(Transports).some((el) => el === eventType);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
          <h3 class="event__title">${eventType[0].toUpperCase() + eventType.slice(1)}
          ${isCheckEventType ? `To` : `In`}
          ${he.encode(destination.name)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${getYearMonthDayStamp(startTime)}>${getHoursMinutsStamp(startTime)}</time>
                        &mdash;
            <time class="event__end-time" datetime=${getYearMonthDayStamp(endTime)}>${getHoursMinutsStamp(endTime)}</time>
          </p>
          <p class="event__duration">${getDurationTemplate(endTime, startTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplates(offers, maxOffersLength)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventItem(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
