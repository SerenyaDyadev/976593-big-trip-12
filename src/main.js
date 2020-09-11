import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import {generateEvent} from "./mock/event.js";
import {render, remove} from "./utils/dom-utils.js";
import {MenuItem} from "./const.js";
import Api from "./api.js";

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);
console.log(events);


// const AUTHORIZATION = `Basic nfkor2u3e3e2hdiuw`;
// const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

// const api = new Api(END_POINT, AUTHORIZATION);

// api.getEvents().then((events) => {
//   console.log(events);
//   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
//   // а ещё на сервере используется snake_case, а у нас camelCase.
//   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
//   // Есть вариант получше - паттерн "Адаптер"
// });


const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const siteHeader = document.querySelector(`.page-header`);
const siteTripControlsElement = siteHeader.querySelector(`.trip-main__trip-controls`);
const siteMenuComponent = new SiteMenuView();
render(siteTripControlsElement, siteMenuComponent);

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

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
siteMenuComponent.setMenuItem(MenuItem.TABLE);

const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, eventsModel);

const siteTripEvents = document.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(siteTripEvents, eventsModel, filterModel);
filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
