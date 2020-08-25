import SortView from "../view/sort.js";
import {SortType} from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
import {render} from "../utils/dom-utils.js";
import {sortByTime, sortByPrice} from "../utils/date-utils.js";

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
        this._listEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._listEvents.sort(sortByPrice);
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
    const eventPresenter = new EventPresenter(eventListElement);
    eventPresenter.init(event);
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
    this._listDaysComponent.getElement().innerHTML = ``;
  }
}
