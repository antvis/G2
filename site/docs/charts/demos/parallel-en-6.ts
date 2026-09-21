import { Chart } from '@antv/g2';

const axis = {
  zIndex: 1,
  line: true,
  labelStroke: '#fff',
  labelLineWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleLineWidth: 5,
  titleStrokeLineJoin: 'round',
  lineStroke: 'black',
  tickStroke: 'black',
  lineLineWidth: 1,
};

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
  coordinate: {
    type: 'parallel',
    transform: [{ type: 'transpose' }],
  },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
    ],
    color: 'weight (lb)',
    shape: 'smooth',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      palette: 'brBG',
      offset: (t) => 1 - t,
    },
  },
  legend: {
    color: { length: 400, layout: { justifyContent: 'center' } },
  },
  axis: {
    position: axis,
    position1: axis,
    position2: axis,
    position3: axis,
    position4: axis,
  },
  interaction: {
    tooltip: { series: false },
  },
});

chart.render();
