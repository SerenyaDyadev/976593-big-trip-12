import SortView from "../view/sort.js";
import {SortType} from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter from "./event.js";
import {render, remove} from "../utils/dom-utils.js";
import {sortByTime, sortByPrice} from "../utils/date-utils.js";
import {UserAction, UpdateType} from "../const.js";

export default class Trip {
  constructor(listContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._listContainer = listContainer;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._sortComponent = null;

    this._listDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    // this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderListEvents();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortByTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortByPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // _handleEventChange(updatedEvent) {
  // console.log(updatedEvent);
  // console.log(`updatedEvent presenter`);
  // this._listEvents = updateItem(this._listEvents, updatedEvent);
  // this._sourcedListEvents = updateItem(this._sourcedListEvents, updatedEvent);
  // this._eventPresenter[updatedEvent.id].init(updatedEvent);
  // }

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
  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearListEvents();
        this._renderListEvents();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearListEvents({resetSortType: true});
        this._renderListEvents();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearListEvents({resetRenderedTaskCount: true});
    this._renderListEvents();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._listContainer, this._sortComponent);
  }

  _renderNoEvents() {
    render(this._listContainer, this._noEventComponent);
  }

  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderDay(dayView) {
    render(this._listDaysComponent, dayView);
  }

  _renderListEvents() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();

    render(this._listContainer, this._listDaysComponent);

    let dayNumber = 1;
    let dayDate = null;
    let day = null;

    for (let event of this._getEvents()) {
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

  // _clearListEvents() {
  //   Object
  //     .values(this._eventPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   remove(this._listDaysComponent);
  //   this._eventPresenter = {};
  // }

  _clearListEvents({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._listDaysComponent);
    this._taskPresenter = {};

    remove(this._sortComponent);
    // remove(this._noTaskComponent);

    // this._renderListEvents();

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }
}
