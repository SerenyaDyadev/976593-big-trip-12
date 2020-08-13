import TripInfoView from "./view/trip-info.js";
import TripControlView from "./view/trip-controls.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort-events.js";
import TripEditView from "./view/event-add-edit.js";
import ListTripDaysView from "./view/list-days.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./dom-utils.js";

const EVENT_COUNT = 16;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeader = document.querySelector(`.page-header`);

const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, new TripControlView().getElement(), RenderPosition.BEFOREEND);
render(siteTripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const sitePageMain = document.querySelector(`.page-main`);
const siteTripEvents = sitePageMain.querySelector(`.trip-events`);

render(siteTripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
render(siteTripEvents, new TripEditView(events[0]).getElement(), RenderPosition.BEFOREEND);
render(siteTripEvents, new ListTripDaysView(events, EVENT_COUNT).getElement(), RenderPosition.BEFOREEND);

