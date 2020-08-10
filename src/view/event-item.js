import {humanizeEventDate} from "../utils.js";

const getDurationTemplate = (minutesDuration) => {
  const oneHourInMinutes = 60;
  const oneDayInHours = 24;
  const minLengthTimeStamp = 2;
  const hoursDuration = minutesDuration / oneHourInMinutes;

  let days = Math.floor(hoursDuration / oneDayInHours) + `D` !== `0D`
    ? Math.floor(hoursDuration / oneDayInHours) + `D`
    : ``;

  days = days.length === minLengthTimeStamp
    ? `0` + days
    : days;

  let hours = Math.floor(hoursDuration % oneDayInHours) + `H` !== `0H`
    ? Math.floor(hoursDuration % oneDayInHours) + `H`
    : ``;

  hours = hours.length === minLengthTimeStamp
    ? `0` + hours
    : hours;

  const mins = Math.floor(minutesDuration % oneHourInMinutes) + `M`;

  return (days + hours + mins);
};

const createOffersTemplates = (offers, offerPrices) => {

  offers.sort(() => Math.random() - 0.5);

  const template = [];
  const maxOfferLength = 3;
  const templateLength = offers.length > maxOfferLength ? maxOfferLength : offers.length;

  for (let i = 0; i < templateLength; i++) {
    template[i] = `<li class="event__offer">
              <span class="event__offer-title">${offers[i]}</span>
                          &plus;
                          &euro;&nbsp;<span class="event__offer-price">${offerPrices[i]}</span>
            </li>`;
  }

  return template.join(` `);
};

export const createEventItem = (event) => {
  const {typeEvent, destination, time, duration, price, offers, offerPrices} = event;
  const [startTime, endTime] = time;
  const durationTemplate = getDurationTemplate(duration);
  const startPeriod = humanizeEventDate(startTime).slice(11, 17);
  const endPeriod = humanizeEventDate(endTime).slice(11, 17);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
                      </div>
          <h3 class="event__title">${typeEvent} To ${destination}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime=${startTime}>${startPeriod}</time>
                          &mdash;
                          <time class="event__end-time" datetime=${endTime}>${endPeriod}</time>
            </p>
            <p class="event__duration">${durationTemplate}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${createOffersTemplates(offers, offerPrices)}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};
