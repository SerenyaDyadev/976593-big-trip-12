export const createDayItem = (event) => {
  console.log(event);
  const {time} = event;
  const dateStamp = time[0].toLocaleString(`en-GB`, {day: `2-digit`, month: `short`}).toUpperCase();
  const dayStamp = time[0].toLocaleString(`fr-CA`, {year: `numeric`, month: `2-digit`, day: `2-digit`});

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${dayStamp}">${dateStamp}</time>
      </div>
    </li>`
  );
};
