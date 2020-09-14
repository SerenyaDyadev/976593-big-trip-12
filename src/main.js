import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {render, remove, RenderPosition} from "./utils/dom-utils.js";
import {MenuItem, UpdateType} from "./const.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic kjgkjgv5476bv76rt`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.page-header`);
const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
const siteMenuComponent = new SiteMenuView();

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


const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

const siteTripEvents = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(siteTripEvents, eventsModel, filterModel, apiWithProvider);
filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});

Promise.all([api.getAddDestinations(), api.getAddOffers(), api.getEvents()])
.then((values) => {
  eventsModel.setAddDestinations(values[0]);
  eventsModel.setAddOffers(values[1]);
  eventsModel.setEvents(UpdateType.INIT, values[2]);
  render(siteTripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
});

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`)
//     .then(() => {
//       // Действие, в случае успешной регистрации ServiceWorker
//       console.log(`ServiceWorker available`); // eslint-disable-line
//     }).catch(() => {
//       // Действие, в случае ошибки при регистрации ServiceWorker
//       console.error(`ServiceWorker isn't available`); // eslint-disable-line
//     });
// });

// window.addEventListener(`online`, () => {
//   document.title = document.title.replace(` [offline]`, ``);
//   apiWithProvider.sync();
// });

// window.addEventListener(`offline`, () => {
//   document.title += ` [offline]`;
// });
