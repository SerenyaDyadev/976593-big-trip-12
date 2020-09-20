import he from "he";
import SmartView from "./smart.js";
import {Transports} from "../const.js";
import {getFullDateForTeplate} from "../utils/date-utils.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  isFavorite: false,
  price: ``,
  dateFrom: new Date(),
  dateTo: new Date(),
  eventType: Transports.TAXI,
  destination: {
    name: ``,
    description: ``,
    pictures: false
  },
  offers: []
};

const isChecked = (teplateElement, eventOffers) => {
  const checked = eventOffers.some((el) => el.title === teplateElement);

  if (!checked) {
    return ``;
  }

  return `checked`;
};

const getOffersList = (eventOffers, templateOffers) => {

  return new Array(templateOffers.length).fill().map((element, index) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${(templateOffers[index].title).toLowerCase().replace(/ /g, `-`)}" type="checkbox" name="${templateOffers[index].title}" ${isChecked(templateOffers[index].title, eventOffers)}>
      <label class="event__offer-label" for="event-offer-${(templateOffers[index].title).toLowerCase().replace(/ /g, `-`)}">
        <span class="event__offer-title">${templateOffers[index].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${templateOffers[index].price}</span>
      </label>
    </div>`).join(` `);
};

const createPhotoTeplate = (pictures) => {
  if (!pictures) {
    return ``;
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
       ${new Array(pictures.length).fill().map((element, index) => `<img class="event__photo" src="${pictures[index].src}" alt="${pictures[index].description}">`).join(`,`)}
      </div>
    </div>`);
};

const destinationsList = (addDestinations) => {

  return new Array(addDestinations.length).fill().map((element, index) => `<option value="${addDestinations[index].name}"></option>`).join(`,`);
};

const getDescriptionDestinationTemplate = (description, pictures) => {
  if (!description || !pictures) {
    return ``;
  }

  return (`
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${description}</p>

            ${createPhotoTeplate(pictures)}

        </section>`
  );
};


const createFavoriteTemplate = (isFavorite) => {

  return (`
          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
          </label>`
  );
};

const createTypesList = (addOffers, eventTypeSelected) => {
  const transportTypes = [];
  const activityTypes = [];

  for (const offer of addOffers) {
    if (offer.type.toUpperCase() in Transports) {
      transportTypes.push(`
        <div class="event__type-item">
          <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"  value="${offer.type}" ${eventTypeSelected === offer.type ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type.slice(0, 1).toUpperCase() + offer.type.slice(1)}</label>
        </div>`
      );
    } else {
      activityTypes.push(`
        <div class="event__type-item">
          <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${eventTypeSelected === offer.type ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type.slice(0, 1).toUpperCase() + offer.type.slice(1)}</label>
        </div>`
      );
    }
  }


  return (`
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Transfer</legend>

    ${transportTypes.join(``)}

    </fieldset>

    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>

        ${activityTypes.join(``)}

    </fieldset>`
  );
};

const createEditEventTemplate = (addDestinations, addOffers, event, isNew) => {
  const {
    isFavorite,
    price,
    dateFrom,
    dateTo,
    eventType,
    destination: {
      name,
      description,
      pictures
    },
    offers: eventOffers,
    isDisabled,
    isSaving,
    isDeleting
  } = event;

  const action = isDeleting ? `Deleting...` : `Delete`;

  const templateOffers = addOffers.find((offer) => offer.type === eventType.toLowerCase()).offers;

  const isCheckEventType = Object.values(Transports).some((el) => el === eventType);

  const startTime = getFullDateForTeplate(dateFrom).replace(`,`, ``);
  const endTime = getFullDateForTeplate(dateTo).replace(`,`, ``);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">

                ${createTypesList(addOffers, eventType)}

              </div>

          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventType[0].toUpperCase() + eventType.slice(1)}
              ${isCheckEventType ? `to` : `in`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(name)}" list="destination-list-1" autocomplete="off">
            <datalist id="destination-list-1">

              ${destinationsList(addDestinations)}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}" readonly>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}" readonly>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
              <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"  step="1" min="1" autocomplete="off" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}> ${isSaving ? `Saving...` : `Save`}</button>
          <button class="event__reset-btn" type="reset">${isNew ? `Cancel` : action}</button>

          ${createFavoriteTemplate(isFavorite)}

        </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
               <div class="event__available-offers">

                  ${getOffersList(eventOffers, templateOffers)}

               </div>
            </section>

              ${getDescriptionDestinationTemplate(description, pictures)}

          </section>
          </form>`
  );
};

export default class AddEdit extends SmartView {
  constructor(addDestinations, addOffers, event) {
    super();

    if (!event) {
      event = BLANK_EVENT;
      this._isNew = true;
    }

    this._data = AddEdit.parseEventToData(event);
    this._addDestinations = addDestinations;
    this._addOffers = addOffers;
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
    this._checkDestinationsValidity();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerStart || this._datepickerEnd) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();

      this._datepickerStart = null;
      this._datepickerEnd = null;
    }
  }

  reset(event) {
    this.updateData(
        AddEdit.parseEventToData(event)
    );
  }

  getTemplate() {
    return createEditEventTemplate(this._addDestinations, this._addOffers, this._data, this._isNew);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickers() {
    if (this._datepickerStart || this._datepickerEnd) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();

      this._datepickerStart = null;
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateFrom,
          onChange: this._startTimeChangeHandler
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateTo,
          minDate: this._data.dateFrom,
          onChange: this._endTimeChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-wrapper`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    this.getElement()
      .querySelector(`.event__available-offers`)
      .addEventListener(`click`, this._offerChangeHandler);

    if (!this._isNew) {
      this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._handleFavoriteClick);
    }
  }

  _offerChangeHandler(evt) {

    if (evt.target.nodeName !== `INPUT`) {
      return;
    }

    const offers = this._data.offers.map((offer) => Object.assign({}, offer));
    const offerIndex = offers.findIndex((it) => it.title === evt.target.name);

    if (offerIndex < 0) {
      const templateOffers = this._addOffers.find((offer) => offer.type === this._data.eventType.toLowerCase()).offers;
      const newOffer = templateOffers.find((it) => it.title === evt.target.name);
      if (newOffer) {
        offers.push(newOffer);
      }
    } else {
      offers.splice(offerIndex, 1);
    }

    this.updateData(
        {
          offers,
          isDisabled: false
        });
  }

  _typeChangeHandler(evt) {
    if (evt.target.value !== `on`) {
      this.updateData(
          {
            eventType: evt.target.value,
            offers: [],
            isDisabled: false
          });
    }
  }

  _destinationChangeHandler(evt) {
    if (this._addDestinations.some((destination) => destination.name === evt.target.value)) {
      this.updateData(
          {
            destination: {
              name: evt.target.value,
              description: this._addDestinations.find((destination) => destination.name === evt.target.value).description,
              pictures: this._addDestinations.find((destination) => destination.name === evt.target.value).pictures
            },
            isDisabled: false
          });
    }
  }

  _startTimeChangeHandler([time]) {
    this.updateData(
        {
          dateFrom: time,
          isDisabled: false
        });
  }

  _endTimeChangeHandler([time]) {
    this.updateData(
        {
          dateTo: time,
          isDisabled: false
        });
  }

  _checkDestinationsValidity() {
    const destinationInput = this.getElement().querySelector(`.event__field-group--destination input`);
    let message = ``;
    let validity = true;
    const destinations = [];

    for (const destination of this._addDestinations) {
      destinations.push(destination.name);
    }

    if (destinationInput.value.length === 0) {
      message = `Не указан пункт назначения`;
      validity = false;
    } else if (!destinations.includes(destinationInput.value)) {
      message = `Такого пункта назначения в предложенном списке нет!`;
      validity = false;
    }

    destinationInput.setCustomValidity(message);
    return validity;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    if (this._checkDestinationsValidity()) {
      this._callback.formSubmit(AddEdit.parseDataToEvent(this._data));
    }
  }

  _handleFavoriteClick() {
    this.updateData(
        {
          isFavorite: !this._data.isFavorite,
        });
    this._callback.favoriteClick(AddEdit.parseDataToEvent(this._data));
  }

  _priceChangeHandler(evt) {
    this.updateData(
        {
          price: Number(evt.target.value),
          isDisabled: false
        });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(AddEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isDisabled: true,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
