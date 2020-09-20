import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, remove, RenderPosition} from "./utils/dom-utils.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic dljfbghjkdfbgklsjkl3223`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeader = document.querySelector(`.page-header`);
const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
const siteTripEvents = document.querySelector(`.trip-events`);
const eventNewButton = siteHeader.querySelector(`.trip-main__event-add-btn`);

const neweEventButtonCleckHendler = (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  tripPresenter.createEvent(newPointFormCloseHandler);
  eventNewButton.disabled = true;
};

const newPointFormCloseHandler = () => {
  eventNewButton.disabled = false;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      remove(statisticsComponent);
      tripPresenter.init();
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      render(siteTripEvents, statisticsComponent);
      break;
  }
};

const enableMenu = () => {
  render(siteTripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  eventNewButton.addEventListener(`click`, neweEventButtonCleckHendler);
  eventNewButton.disabled = false;
};


const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const siteMenuComponent = new SiteMenuView();

const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);
const tripPresenter = new TripPresenter(siteTripEvents, eventsModel, filterModel, apiWithProvider);

filterPresenter.init();
tripPresenter.init();

Promise.all([apiWithProvider.getAddDestinations(), apiWithProvider.getAddOffers(), apiWithProvider.getEvents()])
.then(([offers, destinations, events]) => {
  eventsModel.setAddDestinations(offers);
  eventsModel.setAddOffers(destinations);
  eventsModel.setEvents(UpdateType.INIT, events);
  enableMenu();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
