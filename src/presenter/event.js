import EventView from "../view/event.js";
import EventEditView from "../view/edit-event.js";
import {render, replace, remove, escDown} from "../utils/dom-utils.js";

export default class Event {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;

    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent);
      return;
    }

    if (this._eventListContainer.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventListContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (escDown(evt.key)) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToCard();
  }
}
