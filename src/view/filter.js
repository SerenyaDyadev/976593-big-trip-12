import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

const createFilterTemplate = (currentFilterType) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVRYTHING ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(currentFilterType) {
    super();
    // this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createFilterTemplate(this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    console.log(evt.target.tagName);
    // if (evt.target.tagName !== `LABEL`) {
    //   return;
    // }
    // evt.preventDefault();
    // this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
