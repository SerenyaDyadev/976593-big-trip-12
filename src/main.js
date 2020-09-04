import InfoView from "./view/info.js";
import PageControlView from "./view/page-control.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import EventsModel from "./model/points.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/dom-utils.js";

const EVENT_COUNT = 12;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((event1, event2) => {
  if (event1.date_from > event2.date_from) {
    return 1;
  } else if (event1.date_from < event2.date_from) {
    return -1;
  } else {
    return 0;
  }
});

const eventsModel = new EventsModel();
eventsModel.setTasks(events);

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, new PageControlView().getElement());
render(siteTripControlsElement, new FilterView().getElement());


const siteTripEvents = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteTripEvents, eventsModel);
tripPresenter.init(events);

