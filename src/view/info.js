import AbstractView from "./abstract.js";
import {getMonthStamp, getDayStamp, sortByEvent} from "../utils/date-utils.js";

const createInfoTemplate = (events) => {


  if (events === null || events.length === 0) {
    return (
      `<section class="trip-main__trip-info  trip-info">
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
            </p>
      </section>`
    );
  } else {

    events.sort(sortByEvent);
    const destinations = new Array(events.length).fill().map((element, index) => events[index].destination.name);
    let destinationsTemplate = destinations.join(`,`).replace(/,/g, ` &mdash; `);

    if (destinations.length > 3) {
      destinationsTemplate = destinations[0] + ` &mdash; ` + `...` + ` &mdash; ` + destinations[destinations.length - 1];
    }

    let eventsPrice = 0;
    let offersPrice = 0;

    for (const event of events) {
      for (const offer of event.offers) {
        offersPrice += offer.price;
      }
      eventsPrice += event.price;
    }

    const totalPrice = eventsPrice + offersPrice;

    const dates = new Array(events.length).fill().map((element, index) => getMonthStamp(events[index].dateFrom).toUpperCase() + ` ` + getDayStamp(events[index].dateFrom)).sort();

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${destinationsTemplate}</h1>

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
