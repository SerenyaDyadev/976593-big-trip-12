import TripInfoView from "./view/trip-info.js";
import TripControlView from "./view/trip-controls.js";
import TripFilterView from "./view/trip-filter.js";
import TripSortView from "./view/trip-sort-events.js";
import TripEditView from "./view/event-add-edit.js";
import TripListView from "./view/trip-list.js";
import DayItemView from "./view/day-item.js";
import EventItemView from "./view/event-item.js";
import NoEventView from "./view/no-event.js";
import {generateEvent} from "./mock/event.js";
import {getYearMonthDayStamp} from "./date-utils.js";
import {render, RenderPosition} from "./dom-utils.js";

const EVENT_COUNT = 5;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeader = document.querySelector(`.page-header`);
const siteTripMainInfoElement = siteHeader.querySelector(`.trip-main`);
render(siteTripMainInfoElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);

const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
render(siteTripControlsElement, new TripControlView().getElement(), RenderPosition.BEFOREEND);
render(siteTripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const sitePageMain = document.querySelector(`.page-main`);
const siteTripEvents = sitePageMain.querySelector(`.trip-events`);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventItemView(event);
  const eventEditComponent = new TripEditView(event);

  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderListEvents = (listContainer, listEvents) => {
  if (listEvents.length === 0) {
    render(listContainer, new NoEventView().getElement(), RenderPosition.BEFOREEND);
    return;
  }
  render(siteTripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);

  render(listContainer, new TripListView().getElement(), RenderPosition.BEFOREEND);

  const sorted = listEvents.slice().sort((event1, event2) => {
    if (event1.date.start > event2.date.start) return 1;
    if (event1.date.start < event2.date.start) return -1;
    return 0;
  });

  console.log(sorted);

  const eventsByDays = new Map();

  for (let event of listEvents) {
    const date = getYearMonthDayStamp(event.time[0]);
    const day = eventsByDays.get(date);

    if (day) {
      day.push(event);
    } else {

      eventsByDays.set(date, Array.of(renderEvent(event)));
      // eventsByDays.set(date, Array.of(event));
    }
  }

  console.log(eventsByDays.values());

  // for (let eventsInDay of eventsByDays.values()) {
  render(listContainer.lastChild, new DayItemView(eventsInDay).getElement(), RenderPosition.BEFOREEND);
  // }


//  render(listContainer.lastChild, new DayItemView(listEvents).getElement(), RenderPosition.BEFOREEND);


    /*
    const days = listContainer.querySelectorAll(`.trip-days__item`);

    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < listEvents.length; j++) {
        if (days[i].querySelector(`.day__date`).getAttribute(`datetime`) === getYearMonthDayStamp(listEvents[j].time[0])) {
          renderEvent(days[i].querySelector(`.trip-events__list`), listEvents[j]);
        }
      }
    }*/
};

renderListEvents(siteTripEvents, events);
