import AbstractView from "./abstract.js";

const createDaysTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripDays extends AbstractView {

  getTemplate() {
    return createDaysTemplate();
  }
}
