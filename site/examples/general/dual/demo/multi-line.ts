import { Chart } from '@antv/g2';

const data = [
  {
    Month: 'Jan',
    Evaporation: 2,
    Precipitation: 2.6,
    Temperature: 2,
  },
  {
    Month: 'Feb',
    Evaporation: 4.9,
    Precipitation: 5.9,
    Temperature: 2.2,
  },
  {
    Month: 'Mar',
    Evaporation: 7,
    Precipitation: 9,
    Temperature: 3.3,
  },
  {
    Month: 'Apr',
    Evaporation: 23.2,
    Precipitation: 26.4,
    Temperature: 4.5,
  },
  {
    Month: 'May',
    Evaporation: 25.6,
    Precipitation: 28.7,
    Temperature: 6.3,
  },
  {
    Month: 'Jun',
    Evaporation: 76.7,
    Precipitation: 70.7,
    Temperature: 10.2,
  },
  {
    Month: 'Jul',
    Evaporation: 135.6,
    Precipitation: 175.6,
    Temperature: 20.3,
  },
  {
    Month: 'Aug',
    Evaporation: 162.2,
    Precipitation: 182.2,
    Temperature: 23.4,
  },
  {
    Month: 'Sep',
    Evaporation: 32.6,
    Precipitation: 48.7,
    Temperature: 23,
  },
  {
    Month: 'Oct',
    Evaporation: 20,
    Precipitation: 18.8,
    Temperature: 16.5,
  },
  {
    Month: 'Nov',
    Evaporation: 6.4,
    Precipitation: 6,
    Temperature: 12,
  },
  {
    Month: 'Dec',
    Evaporation: 3.3,
    Precipitation: 2.3,
    Temperature: 6.2,
  },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: data,
  children: [
    {
      type: 'line',
      encode: {
        x: 'Month',
        y: 'Temperature',
        color: '#EE6666',
        shape: 'smooth',
      },
      scale: {
        y: { independent: true, domainMax: 30 },
      },
      axis: {
        y: {
          title: 'Temperature (°C)',
          grid: null,
          titleFill: '#EE6666',
        },
      },
    },
    {
      type: 'interval',
      encode: {
        x: 'Month',
        y: 'Evaporation',
        color: '#5470C6',
      },
      scale: {
        y: { independent: true, domainMax: 200 },
      },
      style: {
        fillOpacity: 0.8,
      },
      axis: {
        y: {
          position: 'right',
          title: 'Evaporation (ml)',
          titleFill: '#5470C6',
        },
      },
    },
    {
      type: 'line',
      encode: {
        x: 'Month',
        y: 'Precipitation',
        color: '#91CC75',
      },
      scale: {
        y: { independent: true },
      },
      style: {
        lineWidth: 2,
        lineDash: [2, 2],
      },
      axis: {
        y: {
          position: 'right',
          title: 'Precipitation (ml)',
          grid: null,
          titleFill: '#91CC75',
        },
      },
    },
  ],
});

chart.render();
