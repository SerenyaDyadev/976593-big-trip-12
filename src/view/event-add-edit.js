import {humanizeEventDate} from "../utils.js";

const getOffersTemplate = (offers, offerPrices) => {
  if (offers.length === 0) {
    return ``;
  }

  const template = [];
  for (let i = 0; i < offers.length; i++) {
    template.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers[i].replace(` `)}" type="checkbox"
          name="event-offer-luggage">
        <label class="event__offer-label" for="event-offer-${offers[i].replace(` `)}">
          <span class="event__offer-title">${offers[i]}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offerPrices[i]}</span>
        </label>
      </div>`
    );
  }

  template.join(`,`);

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${template}
    </div>
  </section>`;
};

export const createTripAddEditEvent = (event = {}) => {

  const {
    typeEvent = ` `,
    destination = ` `,
    offers = [],
    offerPrices = [],
    time = [`00-00`, `00-00`],
    price = 0,
    description = ``,
    photoPlace = `http://picsum.photos/248/152?r=${Math.random()}`
  } = event;

  let [startTime, endTime] = time;
  startTime = humanizeEventDate(startTime).replace(`,`, ``);
  endTime = humanizeEventDate(endTime).replace(`,`, ``);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${typeEvent} to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination} list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              ${getOffersTemplate(offers, offerPrices)}
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    <img class="event__photo" src=${photoPlace} alt="Event photo">
                </div>
              </section>
            </section>
          </form>`
  );
};