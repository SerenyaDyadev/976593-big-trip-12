import InfoView from "./view/info.js";
import ControlView from "./view/control.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import NoEventView from "./view/no-event.js";
import ListDaysView from "./view/list-days.js";
import DayView from "./view/day.js";
import EventItemView from "./view/event-item.js";
import AddEditView from "./view/add-edit-event.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils/dom-utils.js";

const EVENT_COUNT = 17;

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

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventItemView(event);
  const eventEditComponent = new AddEditView(event);

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
    render(listContainer, new NoEventView().getElement());
    return;
  }

  render(siteTripEvents, new SortView().getElement());

  const daysList = new ListDaysView();
  render(listContainer, daysList.getElement());

  let dayNumber = 1;
  let dayDate = null;
  let dayView = null;

  for (let event of listEvents) {
    const eventDayDate = event.time[0].getDate();
    if (dayDate === eventDayDate) {
      renderEvent(dayView.getEventsList(), event);
    } else {
      dayView = new DayView(event.time[0], dayNumber);

      render(daysList.getElement(), dayView.getElement());
      renderEvent(dayView.getEventsList(), event);

      dayNumber++;
      dayDate = eventDayDate;
    }
  }
};

renderListEvents(siteTripEvents, events);
