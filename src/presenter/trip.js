import SortView from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventView from "../view/event.js";
import EventEditView from "../view/edit-event.js";
import {render, replace, escDown} from "../utils/dom-utils.js";
import {sortTime, sortPrice} from "../utils/date-utils.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(listContainer) {
    this._listContainer = listContainer;
    this._currentSortType = SortType.EVENT;

    this._sortComponent = new SortView();
    this._listDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(listEvents) {
    this._listEvents = listEvents.slice();
    this._sourcedListEvents = listEvents.slice();

    this._renderListEvents();
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._listEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._listEvents.sort(sortPrice);
        break;
      default:
        this._listEvents = this._sourcedListEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearListEvents();
    this._renderListEvents();
  }

  _renderSort() {
    render(this._listContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoTasks() {
    render(this._listContainer, this._noEventComponent);
  }

  _renderEvent(eventListElement, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (escDown(evt.key)) {
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

  _clearListEvents() {
    // console.log(`clear`);
    this._listDaysComponent.getElement().innerHTML = ``;
  }
}
