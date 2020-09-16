import moment from "moment";
import SmartView from "./smart.js";
import {TRANSPORTS} from "../const.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const renderMoneyChart = (moneyCtx, events) => {
  const money = new Map();

  for (let event of events) {
    const sum = money.get(event.eventType.toUpperCase());
    if (!sum) {
      money.set(event.eventType.toUpperCase(), event.price);
    } else {
      money.set(event.eventType.toUpperCase(), event.price + sum);
    }
  }

  const typeValues = Array.from(money.keys());
  const priceValues = Array.from(money.values());

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeValues,
      datasets: [{
        data: priceValues,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {
  const transportCounts = new Map();

  for (let event of events) {
    if (event.eventType.toUpperCase() in TRANSPORTS) {
      const count = 1;
      const type = transportCounts.get(event.eventType.toUpperCase());
      if (!type) {
        transportCounts.set(event.eventType.toUpperCase(), count);
      } else {
        transportCounts.set(event.eventType.toUpperCase(), count + 1);
      }
    }
  }

  const trasportTypes = Array.from(transportCounts.keys());
  const trasportCounts = Array.from(transportCounts.values());

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: trasportTypes,
      datasets: [{
        data: trasportCounts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, events) => {
  const destinations = new Map();

  for (let event of events) {
    let durationValue = 0;
    const duration = event.dateTo - event.dateFrom;

    const target = destinations.get(event.destination.name.toUpperCase());
    if (!target) {
      durationValue = duration;
      destinations.set(event.destination.name.toUpperCase(), durationValue);
    } else {
      durationValue = target + duration;
      destinations.set(event.destination.name.toUpperCase(), durationValue);
    }
  }

  const eventDestinations = Array.from(destinations.keys());
  const eventTimeSpends = Array.from(destinations.values()).map((el) => moment(el).format(`H`));

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: eventDestinations,
      datasets: [{
        data: eventTimeSpends,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const createStatisticsTemplate = () => {

  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class Statistics extends SmartView {
  constructor(events) {
    super();

    this._data = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  _setCharts() {
    const BAR_HEIGHT = 55;

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._transportChart = renderTransportChart(transportCtx, this._data);
    this._timeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data);
  }
}
