import {getRandomInteger, getRandomElement} from "../utils/common.js";
import {EVENT_TYPES, DESTINATIONS, DESCRIPTIONS, OFFER_LIST} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getTimeStamp = (maxMinutsGap, maxDaysGap) => {
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
  const maxMinutsGap = 120;
  const maxDaysGap = 4;
  const eventType = getRandomElement(EVENT_TYPES);
  const offers = OFFER_LIST[eventType];
  const offerPrices = new Array(offers.length).fill().map(() => getRandomInteger(0, 100));
  const {time, duration} = getTimeStamp(maxMinutsGap, maxDaysGap);
  const isFavorite = Boolean(getRandomInteger(0, 1));
  return {
    id: generateId(),
    isChange: false,
    isFavorite,
    eventType,
    destination: getRandomElement(DESTINATIONS),
    offers,
    offerPrices,
    time,
    duration,
    price: getRandomInteger(0, 100),
    description: getRandomElement(DESCRIPTIONS),
    photoPlace: `http://picsum.photos/248/152?r=${Math.random()}`
  };
};

// isFavoriteFlag - пока временное решение
