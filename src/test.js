const today = new Date();

const incrementDateFor = (date, days) => {
  const result = new Date();
  result.setDate(date.getDate() + days);
  return result;
}

const events = [{
  name: `bla bla`,
  date: {
    start: today
  }
},
{
  name: `bla bla 2`,
  date: {
    start: incrementDateFor(today, 1)
  }
},
{
  name: `bla bla 3`,
  date: {
    start: incrementDateFor(today, 2)
  }
}
];

const eventsList = document.querySelector(`.events-list`);

const renderDay = (dayEvents) => {
  if (dayEvents.length == 0) {
    return ``;
  }

  const dayDate = dayEvents[0].date.start.getDate();

  return (`
  	<li>
      <div>Day: ${dayDate}</div>
      <ul>
      	${dayEvents.map(event => (`
        	<li>${event.name}</li>
        `)).join(`\n`)}
      </ul>
    </li>
  `);
};

const getDateWithoutTime = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const renderEvents = (events) => {
  const eventsByDays = new Map();

  for (let event of events) {
    const date = getDateWithoutTime(event.date.start);
    const day = eventsByDays.get(date);
    if (day) {
      day.push(event);
    } {
      eventsByDays.set(date, Array.of(event));
    }
  }

  for (let eventsInDay of eventsByDays.values()) {
    const day = renderDay(eventsInDay);
    eventsList.insertAdjacentHTML(`beforeend`, day);
  }
};

renderEvents(events);

