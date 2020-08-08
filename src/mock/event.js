const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getTypeEvent = () =>{
  const typeEvents = [
    `Taxi`,
    `Bus`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, typeEvents.length - 1);

  return typeEvents[randomIndex];
};

const getDestination = () => {
  const destinations = [
    `Moscow`,
    `SaintPeterb`,
    `Voronezh`,
    `RostovOnDon`,
    `Krasnodar`,
    `Sochi`
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const getOffers = (typeEvent) => {
  const offerList = {
    Taxi: [`Order Uber`, `Taxi Minivan`, `Business Class`],
    Bus: [`Comfort Chair`, `Bisiness Chair`],
    Ship: [`Lux`],
    Transport: [`Comfort ticket`, `Bisiness ticket`],
    Drive: [`Motorbike`, `Sedan`, `MiniBus`],
    Flight: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`],
    Check: [],
    Sightseeing: [],
    Restaurant: [`Two persons`, `Dinner`]
  };

  return offerList[typeEvent];
};

const getOfferPrice = (offers) => {
  const offerPrice = (new Array(offers.length)).fill().map(() => getRandomInteger(0, 100));

  return offerPrice;
};


const getTimeStamp = () => {
  const maxMinutsGap = 1000;
  const currentDate = new Date();
  const time = [];
  let minutsGap = getRandomInteger(0, maxMinutsGap);
  let duration = minutsGap * 2;
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + minutsGap)).toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`}));
  time.push(new Date(currentDate.setMinutes(currentDate.getMinutes() + duration)).toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`}));
  time.push(duration);
  return time;
};

const getDecription = () => {
  const description = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomIndex = getRandomInteger(0, description.length - 1);

  return description[randomIndex];
};

export const generateEvent = () => {
  const typeEvent = getTypeEvent();
  const offers = getOffers(typeEvent);
  const offerPrices = getOfferPrice(offers);
  const time = getTimeStamp();

  return {
    typeEvent,
    destination: getDestination(),
    offers,
    offerPrices,
    time,
    price: getRandomInteger(0, 100),
    description: getDecription(),
    photoPlace: `http://picsum.photos/248/152?r=${Math.random()}`
  };
};
