import {getRandomInteger} from "../utils.js";
import {TYPE_EVENTS, DESTINATIONS, DESCRIPTIONS, OFFER_LIST} from "../const.js";

const getTimeStamp = () => {
  const maxMinutsGap = 120;
  const maxDaysGap = 4;
  let currentDate = new Date();
  currentDate = new Date(currentDate.setDate(currentDate.getDate() + getRandomInteger(0, maxDaysGap)));

  const time = [];
  let minutsGap = getRandomInteger(0, maxMinutsGap);
  let duration = getRandomInteger(0, minutsGap);
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + minutsGap)));
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + duration)));

  return {time, duration};
};

export const generateEvent = () => {
  const typeEvent = TYPE_EVENTS[getRandomInteger(0, TYPE_EVENTS.length - 1)];
  const offers = OFFER_LIST[typeEvent];
  const offerPrices = (new Array(offers.length)).fill().map(() => getRandomInteger(0, 100));
  const {time, duration} = getTimeStamp();

  return {
    typeEvent,
    destination: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
    offers,
    offerPrices,
    time,
    duration,
    price: getRandomInteger(0, 100),
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    photoPlace: `http://picsum.photos/248/152?r=${Math.random()}`
  };
};
