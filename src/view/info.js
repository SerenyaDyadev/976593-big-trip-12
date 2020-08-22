import {getMonthStamp, getDayStamp} from "../date-utils.js";
import {createElement} from "../dom-utils.js";

const createTripInfoTemplate = (events) => {

  if (events.length === 0) {
    return (
      `<section class="trip-main__trip-info  trip-info">
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>
      </section>`
    );
  } else {
    const destinations = new Array(events.length).fill().map((element, index) => events[index].destination).join(`,`).replace(/,/g, ` &mdash; `);

    let totalPrice = 0;
    for (let i = 0; i < events.length; i++) {
      totalPrice += events[i].price;
    }

    const dates = new Array(events.length).fill().map((element, index) => getMonthStamp(events[index].time[0]).toUpperCase() + ` ` + getDayStamp(events[index].time[0])).sort();

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${destinations}</h1>

          <p class="trip-info__dates">${dates[0]}&nbsp;&mdash;&nbsp;${dates[dates.length - 1].slice(4)}</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
        </p>
       </section>`
    );
  }
};

export default class Info {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
