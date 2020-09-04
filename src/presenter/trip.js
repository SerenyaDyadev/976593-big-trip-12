import SortView from "../view/sort.js";
import {SortType} from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
// import {updateItem} from "../utils/common.js";
import {render, remove} from "../utils/dom-utils.js";
import {sortByTime, sortByPrice} from "../utils/date-utils.js";

export default class Trip {
  constructor(listContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._listContainer = listContainer;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._listDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    // this._listEvents = listEvents.slice();
    // this._sourcedListEvents = listEvents.slice();

    this._renderListEvents();
  }

  _getTasks() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._tasksModel.getTasks().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._tasksModel.getTasks().slice().sort(sortByPrice);
    }

    return this._eventsModel.getTasks();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    // console.log(updatedEvent);
    // console.log(`updatedEvent presenter`);
    // this._listEvents = updateItem(this._listEvents, updatedEvent);
    // this._sourcedListEvents = updateItem(this._sourcedListEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  // _sortEvents(sortType) {
  //   // switch (sortType) {
  //   //   case SortType.TIME:
  //   //     this._listEvents.sort(sortByTime);
  //   //     break;
  //   //   case SortType.PRICE:
  //   //     this._listEvents.sort(sortByPrice);
  //   //     break;
  //   //   default:
  //   //     this._listEvents = this._sourcedListEvents.slice();
  //   // }

  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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
    const eventPresenter = new EventPresenter(eventListElement, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderDay(dayView) {
    render(this._listDaysComponent, dayView);
  }

  _renderListEvents() {
    if (this._getTasks().length === 0) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    render(this._listContainer, this._listDaysComponent);

    let dayNumber = 1;
    let dayDate = null;
    let day = null;

    for (let event of this._getTasks()) {
      const eventDayDate = event.date_from.getDate();
      if (dayDate === eventDayDate) {
        this._renderEvent(day.getEventsList(), event);
      } else {
        day = new DayView(event.date_from, dayNumber);

        this._renderDay(day);
        this._renderEvent(day.getEventsList(), event);

        dayNumber++;
        dayDate = eventDayDate;
      }
    }
  }

  _clearListEvents() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._listDaysComponent);
    this._eventPresenter = {};
  }
}
