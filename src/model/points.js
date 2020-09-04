import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setTasks(events) {
    this._events = events.slice();
  }

  getTasks() {
    return this._events;
  }
}
