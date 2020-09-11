import {getRandomInteger, getRandomElement} from "../utils/common.js";
import {EVENT_TYPES, DESTINATIONS, DESCRIPTIONS, OFFER_LIST} from "../const.js";

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getTimeStamp = (maxMinutsGap, maxDaysGap) => {
  let currentDate = new Date();
  currentDate = new Date(currentDate.setDate(currentDate.getDate() + getRandomInteger(0, maxDaysGap)));

  const time = [];
  let minutsGap = getRandomInteger(0, maxMinutsGap);
  let duration = getRandomInteger(0, minutsGap);
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + minutsGap)));
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + duration)));

  return {time};
};

const getPhotoObject = () =>{
  return {
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: getRandomElement(DESCRIPTIONS),
  };
};

const getOffersObject = (title) => {
  return {
    offerTitle: title,
    offerPrice: getRandomInteger(0, 100),
  };
};

const getOffers = (eventType) => {
  if (eventType.length) {
    return new Array(eventType.length).fill(``).map((el, index) => getOffersObject(eventType[index]));
  }

  return null;
};


export const generateEvent = () => {
  const maxMinutsGap = 120;
  const maxDaysGap = 4;
  const eventType = getRandomElement(Object.values(EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)]));
  const photos = new Array(getRandomInteger(0, 6)).fill(``).map(() => getPhotoObject());
  const {time} = getTimeStamp(maxMinutsGap, maxDaysGap);
  const isFavorite = Boolean(getRandomInteger(0, 1));

  return {
    id: generateId(),
    eventType,
    dateFrom: time[0],
    dateTo: time[1],
    destination: {
      name: getRandomElement(DESTINATIONS),
      description: getRandomElement(DESCRIPTIONS),
      photos
    },
    price: getRandomInteger(0, 100),
    isFavorite,
    offers: getOffers(OFFER_LIST[eventType]),
  };
};
