export const createTripInfoTemplate = (events) => {

  const destinations = new Array(events.length).fill().map((element, index) => events[index].destination).join(`,`).replace(/,/g, ` &mdash; `);

  let totalPrice = 0;
  for (let i = 1; i < events.length; i++) {
    totalPrice += events[i].price;
  }

  const dates = new Array(events.length).fill().map((element, index) => events[index].time[0].toLocaleString(`en-GB`, {month: `short`}).toUpperCase() + ` ` + events[index].time[0].toLocaleString(`en-GB`, {day: `2-digit`})).sort();

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinations}</h1>

        <p class="trip-info__dates">${dates[0]}&nbsp;&mdash;&nbsp;${dates[dates.length - 1].slice(4)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
     </section>`
  );
};
