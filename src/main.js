import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {generateEvent} from "./mock/event.js";
import {render} from "./utils/dom-utils.js";
import {MenuItem} from "./const.js";

const EVENT_COUNT = 6;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.page-header`);
const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
const siteMenuComponent = new SiteMenuView();
render(siteTripControlsElement, siteMenuComponent);

// const handleEventNewFormClose = () => {
// siteMenuComponent.getElement().querySelectorAll(`[value=${MenuItem.TASKS}]`).disabled = false;
// siteMenuComponent.setMenuItem(MenuItem.TABLE);
// };

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      // Скрыть статистику

      // Показать доску
      tripPresenter.init();
      // Убрать выделение с Stats после сохранения
      // tripPresenter.createEvent(handleEventNewFormClose);
      // siteMenuComponent.getElement().querySelectorAll(`.trip-tabs__btn`)[0].classList.add(`trip-tabs__btn--active`);

      siteMenuComponent.setMenuItem(MenuItem.TASKS);
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      tripPresenter.destroy();
      // Скрыть sort
      // Показать статистику
      // Убрать выделение с Table после сохранения
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

const siteTripEvents = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(siteTripEvents, eventsModel, filterModel);
filterPresenter.init();
// tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});

render(siteTripEvents, new StatisticsView(eventsModel.getEvents()));
