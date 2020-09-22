import InfoView from "../view/info.js";
import SortView from "../view/sort.js";
import NoEventView from "../view/no-events.js";
import LoadingView from "../view/loading.js";
import TripDaysView from "../view/trip-days.js";
import DayView from "../view/day.js";
import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import EventNewPresenter from "./edit-event.js";
import {render, remove, RenderPosition} from "../utils/dom-utils.js";
import {sortByEvent, sortByTime, sortByPrice} from "../utils/date-utils.js";
import {SortType, UserAction, UpdateType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Trip {
  constructor(listContainer, eventsModel, filterModel, api) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._listContainer = listContainer;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};
    this._isLoading = true;
    this._api = api;

    this._events = null;
    this._sortComponent = null;
    this._infoComponent = null;

    this._listDaysComponent = new TripDaysView();
    this._noEventComponent = new NoEventView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._listDaysComponent, this._handleViewAction);
  }

  init() {
    this._renderListEvents();
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearListEvents({resetSortType: true});
    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._handleModeChange();
    this._eventNewPresenter.init(this._eventsModel.getAddDestinations(), this._eventsModel.getAddOffers(), callback);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    this._events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](this._events);

    switch (this._currentSortType) {
      case SortType.EVENT:
        return filtredEvents.slice().sort(sortByEvent);
      case SortType.TIME:
        return filtredEvents.slice().sort(sortByTime);
      case SortType.PRICE:
        return filtredEvents.slice().sort(sortByPrice);
    }

    return filtredEvents;
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }


  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.FAVORITE:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.FAVORITE);
        this._api.updateEvent(update).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
          .catch(() => {
            this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.UPDATE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update).then((response) => {
          this._eventsModel.updateEvent(updateType, response);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update).then((response) => {
          this._eventsModel.addEvent(updateType, response);
        })
        .catch(() => {
          this._eventNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenter[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update).then(() => {
          this._eventsModel.deleteEvent(updateType, update);
        })
        .catch(() => {
          this._eventPresenter[update.id].setViewState(EventPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.FAVOTIRE:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        this._clearListEvents();
        this._renderListEvents();
        break;
      case UpdateType.MINOR:
        this._clearListEvents();
        this._renderListEvents();
        break;
      case UpdateType.MAJOR:
        this._clearListEvents({resetSortType: true});
        this._renderListEvents();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearListEvents();
        remove(this._loadingComponent);
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

  _renderInfo() {
    remove(this._infoComponent);
    if (this._infoComponent !== null) {
      this._infoComponent = null;
    }

    this._infoComponent = new InfoView(this._events);

    render(document.querySelector(`.trip-main`), this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._listContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvents() {
    render(this._listContainer, this._noEventComponent);
  }

  _renderEvent(eventListElement, event) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleModeChange, this._eventsModel.getAddDestinations(), this._eventsModel.getAddOffers());
    eventPresenter.init(event);

    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderLoading() {
    render(this._listContainer, this._loadingComponent);
  }

  _renderDay(dayView) {
    render(this._listDaysComponent, dayView);
  }

  _renderListEvents() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._renderInfo(this._getEvents());
    remove(this._sortComponent);
    render(this._listContainer, this._listDaysComponent);

    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();

    let dayNumber = 1;
    let dayDate = null;
    let day = null;

    for (const event of this._getEvents()) {
      const eventDayDate = event.dateFrom.getDate();
      if (dayDate === eventDayDate) {
        this._renderEvent(day.getEventsList(), event);
      } else {
        day = new DayView(event.dateFrom, dayNumber);

        this._renderDay(day);
        this._renderEvent(day.getEventsList(), event);

        dayNumber++;
        dayDate = eventDayDate;
      }
    }
  }


  _clearListEvents({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._listDaysComponent);
    remove(this._noEventComponent);
    remove(this._loadingComponent);
    this._taskPresenter = {};

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }
}
