import InfoView from "./view/info.js";
import PageControlView from "./view/page-control.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/dom-utils.js";

const EVENT_COUNT = 12;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
// const filters = [
//   {
//     type: `all`,
//     name: `ALL`,
//     count: 0
//   }
// ];

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, new PageControlView().getElement());
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

const siteTripEvents = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteTripEvents, eventsModel, filterModel);
filterPresenter.init();
tripPresenter.init(events);
