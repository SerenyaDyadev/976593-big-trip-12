import EventView from "../view/event.js";
import EditEventView from "../view/edit-event.js";
import {render, replace, remove, escDown} from "../utils/dom-utils.js";
import {UserAction, UpdateType} from "../const.js";
import {isTimeChange} from "../utils/date-utils.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  FAVORITE: `FAVORITE`,
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


export default class Event {
  constructor(eventListContainer, changeData, changeMode, addDestinations, addOffers) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._addOffers = addOffers;
    this._addDestinations = addDestinations;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EditEventView(this._addDestinations, this._addOffers, event);

    this._eventComponent.setEditClickHandler(this._editClickHandler);
    this._eventEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._eventEditComponent.setDeleteClickHandler(this._deleteClickHandler);
    this._eventEditComponent.setFavoriteClickHandler(this._favoriteClickHandler);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };


    switch (state) {
      case State.FAVORITE:
        this._eventEditComponent.updateData({
          isFavorite: !this._event.isFavorite
        });
        break;
      case State.SAVING:
        this._eventEditComponent.updateData({
          isSaving: true,
          isDisabled: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (escDown(evt.key)) {
      evt.preventDefault();
      evt.target.blur();
      this.resetView();
    }
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _formSubmitHandler(update) {
    const isMinorUpdate = isTimeChange(this._event.dateFrom, update.dateFrom);
    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        update
    );
  }

  _deleteClickHandler(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }

  _favoriteClickHandler(event) {
    this._changeData(
        UserAction.FAVORITE,
        UpdateType.FAVORITE,
        event
    );
  }
}
