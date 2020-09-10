import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" id="${MenuItem.TABLE}" href="#">Table</a>
      <a class="trip-tabs__btn" id="${MenuItem.STATISTICS}" href="#">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement()
    .addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const element = this.getElement().querySelector(`.trip-tabs__btn--active`);
    if (element) {
      element.classList.remove(`trip-tabs__btn--active`);
    }

    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
