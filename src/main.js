import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripControlsTemplate} from "./view/trip-controls.js";
import {createTripFilterTemplate} from "./view/trip-filter.js";
import {createTripSortEventsTemplate} from "./view/trip-sort-events.js";
import {createTripAddEditEvent} from "./view/event-add-edit.js";
import {createListDays} from "./view/list-days.js";
import {createDayItem} from "./view/day-item.js";
import {createListEvents} from "./view/list-events.js";
import {createEventItem} from "./view/event-item.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 15;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

console.log(events);

const destinationsTemplate = [];
for (let i = 1; i < events.length; i++) {
  destinationsTemplate.push(events[i].destination);
}

let totalTemplate = 0;
for (let i = 1; i < events.length; i++) {
  totalTemplate += events[i].price;
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, createTripInfoTemplate(destinationsTemplate, totalTemplate), `afterbegin`);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, createTripControlsTemplate(), `afterbegin`);
render(siteTripControlsElement, createTripFilterTemplate(), `beforeend`);

const sitePageMain = document.querySelector(`.page-main`);
const siteTripEvents = sitePageMain.querySelector(`.trip-events`);
render(siteTripEvents, createTripSortEventsTemplate(), `beforeend`);
render(siteTripEvents, createTripAddEditEvent(events[0]), `beforeend`);

render(siteTripEvents, createListDays(), `beforeend`);

const siteListDays = siteTripEvents.querySelector(`.trip-days`);
render(siteListDays, createDayItem(events[0]), `beforeend`);

const siteDayItem = siteListDays.querySelector(`.trip-days__tem`);

render(siteDayItem, createListEvents(), `beforeend`);

const siteListEvents = siteDayItem.querySelector(`.trip-events__list`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(siteListEvents, createEventItem(events[i]), `beforeend`);
}
