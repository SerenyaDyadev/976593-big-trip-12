import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripControlsTemplate} from "./view/trip-controls.js";
import {createTripFilterTemplate} from "./view/trip-filter.js";
import {createTripSortEventsTemplate} from "./view/trip-sort-events.js";
import {createTripAddEditEvent} from "./view/event-add-edit.js";
import {createListDays} from "./view/list-days.js";
import {createDayItem} from "./view/day-item.js";
import {createListEvents} from "./view/list-events.js";
import {createEventItem} from "./view/event-item.js";

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, createTripInfoTemplate(), `afterbegin`);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, createTripControlsTemplate(), `afterbegin`);
render(siteTripControlsElement, createTripFilterTemplate(), `beforeend`);

const sitePageMain = document.querySelector(`.page-main`);
const siteTripEvents = sitePageMain.querySelector(`.trip-events`);
render(siteTripEvents, createTripSortEventsTemplate(), `beforeend`);
render(siteTripEvents, createTripAddEditEvent(), `beforeend`);

render(siteTripEvents, createListDays(), `beforeend`);

const siteListDays = siteTripEvents.querySelector(`.trip-days`);
render(siteListDays, createDayItem(), `beforeend`);

const siteDayItem = siteListDays.querySelector(`.trip-days__item`);
render(siteDayItem, createListEvents(), `beforeend`);

const siteListEvents = siteDayItem.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(siteListEvents, createEventItem(), `beforeend`);
}
