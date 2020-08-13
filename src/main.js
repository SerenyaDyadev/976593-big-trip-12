import TripInfoView from "./view/trip-info.js";
import TripControlView from "./view/trip-controls.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort-events.js";
import TripEditView from "./view/event-add-edit.js";
import ListTripDaysView from "./view/list-days.js";
import EventItemView from "./view/event-item.js";
import {generateEvent} from "./mock/event.js";
import {getYearMonthDayStamp} from "./date-utils.js";
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
render(siteTripEvents, new ListTripDaysView(events).getElement(), RenderPosition.BEFOREEND);

const days = siteTripEvents.querySelectorAll(`.trip-days__item`);

for (let i = 0; i < days.length; i++) {
  for (let j = 0; j < events .length; j++) {
    if (days[i].querySelector(`.day__date`).getAttribute(`datetime`) === getYearMonthDayStamp(events[j].time[0])) {
      render(days[i].querySelector(`.trip-events__list`), new EventItemView(events[j]).getElement(), RenderPosition.BEFOREEND);
    }
  }
}
