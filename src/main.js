import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripControlsTemplate} from "./view/trip-controls.js";
import {createTripFilterTemplate} from "./view/trip-filter.js";
import {createTripSortEventsTemplate} from "./view/trip-sort-events.js";
import {createTripAddEditEvent} from "./view/event-add-edit.js";
import {createListDays} from "./view/list-days.js";
import {createDayItem} from "./view/day-item.js";
import {generateEvent} from "./mock/event.js";
import {render} from "./dom-utils.js";

const EVENT_COUNT = 16;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, createTripInfoTemplate(events), `afterbegin`);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, createTripControlsTemplate(), `afterbegin`);
render(siteTripControlsElement, createTripFilterTemplate(), `beforeend`);

const sitePageMain = document.querySelector(`.page-main`);
const siteTripEvents = sitePageMain.querySelector(`.trip-events`);
render(siteTripEvents, createTripSortEventsTemplate(), `beforeend`);
render(siteTripEvents, createTripAddEditEvent(events[0]), `beforeend`);

render(siteTripEvents, createListDays(), `beforeend`);

const siteListDays = siteTripEvents.querySelector(`.trip-days`);
render(siteListDays, createDayItem(events, EVENT_COUNT), `beforeend`);

