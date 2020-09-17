import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

const createFilterTemplate = (currentFilterType, events) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${filter[FilterType.FUTURE](events).length > 0 ? ` ` : `disabled`} ${currentFilterType === FilterType.FUTURE ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${filter[FilterType.PAST](events).length > 0 ? ` ` : `disabled`} ${currentFilterType === FilterType.PAST ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-past"">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(currentFilterType, events) {
    super();
    this._currentFilter = currentFilterType;
    this._events = events;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createFilterTemplate(this._currentFilter, this._events);
  }

  _filterTypeChangeHandler(evt) {
    // console.log(evt);
    if (evt.target.tagName === `INPUT`) {
      this._callback.filterTypeChange(evt.target.value);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
