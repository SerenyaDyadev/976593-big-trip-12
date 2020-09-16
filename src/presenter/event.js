import EventView from "../view/event.js";
import EventEditView from "../view/edit-event.js";
import {render, replace, remove, escDown} from "../utils/dom-utils.js";
import {UserAction, UpdateType} from "../const.js";
import {isTimeChange} from "../utils/date-utils.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
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

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleDeleteClick.bind(this);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(this._addDestinations, this._addOffers, event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);

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
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(update) {
    const isMinorUpdate = isTimeChange(this._event.dateFrom, update.dateFrom);
    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        update
    );
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }
}
