import AbstractView from "./abstract.js";
import {getMonthStamp, getDayStamp} from "../utils/date-utils.js";

const createInfoTemplate = (events) => {

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

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}
