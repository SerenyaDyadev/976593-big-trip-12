import InfoView from "./view/info.js";
import ControlView from "./view/control.js";
import FilterView from "./view/filter.js";
// import SortView from "./view/sort.js";
// import NoEventView from "./view/no-event.js";
// import ListDaysView from "./view/list-days.js";
// import DayView from "./view/day.js";
// import EventItemView from "./view/event-item.js";
// import AddEditView from "./view/add-edit-event.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/dom-utils.js";

const EVENT_COUNT = 18;

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((event1, event2) => {
  if (event1.time[0] > event2.time[0]) {
    return 1;
  } else if (event1.time[0] < event2.time[0]) {
    return -1;
  } else {
    return 0;
  }
});

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, new InfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, new ControlView().getElement());
render(siteTripControlsElement, new FilterView().getElement());


const siteTripEvents = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteTripEvents);

tripPresenter.init(events);
