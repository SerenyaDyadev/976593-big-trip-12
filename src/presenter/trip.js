import SortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import ListDaysView from "../view/list-days.js";
import DayView from "../view/day.js";
import EventItemView from "../view/event-item.js";
import AddEditView from "../view/add-edit-event.js";
import {render, replace} from "../utils/dom-utils.js";

export default class Trip {
  constructor(listContainer) {
    this._listContainer = listContainer;

    this._sortComponent = new SortView();
    this._listDaysComponent = new ListDaysView();
    this._noEventComponent = new NoEventView();
  }

  init(listEvents) {
    this._listEvents = listEvents.slice();

    this._renderListEvents();
  }

  _renderSort() {
    render(this._listContainer, this._sortComponent);
  }

  _renderNoTasks() {
    render(this._listContainer, this._noEventComponent);
  }

  _renderEvent(eventListElement, event) {
    const eventComponent = new EventItemView(event);
    const eventEditComponent = new AddEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(eventListElement, eventComponent);
  }

  _renderDay(dayView) {
    render(this._listDaysComponent, dayView);
  }

  _renderListEvents() {
    if (this._listEvents.length === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    render(this._listContainer, this._listDaysComponent);

    let dayNumber = 1;
    let dayDate = null;
    let day = null;

    for (let event of this._listEvents) {
      const eventDayDate = event.time[0].getDate();
      if (dayDate === eventDayDate) {
        this._renderEvent(day.getEventsList(), event);
      } else {
        day = new DayView(event.time[0], dayNumber);

        this._renderDay(day);
        this._renderEvent(day.getEventsList(), event);

        dayNumber++;
        dayDate = eventDayDate;
      }
    }
  }
}
