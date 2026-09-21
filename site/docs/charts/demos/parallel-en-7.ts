import { Chart } from '@antv/g2';

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  labelStroke: '#fff',
  labelLineWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleLineWidth: 5,
  titleStrokeLineJoin: 'round',
  titleTransform: 'translate(-50%, 0) rotate(-90)',
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
  coordinate: { type: 'parallel' },
  encode: {
    position: [
      'economy (mpg)',
      'cylinders',
      'displacement (cc)',
      'power (hp)',
      'weight (lb)',
    ],
    color: 'cylinders',
  },
  scale: {
    color: {
      palette: 'brBG',
      offset: (t) => 1 - t,
    },
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.6,
  },
  legend: {
    color: { position: 'bottom' },
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
    brushAxisHighlight: {
      maskFill: '#d8d0c0',
      maskOpacity: 0.3,
    },
  },
  state: {
    active: { lineWidth: 3, strokeOpacity: 1 },
    inactive: { stroke: '#ccc', opacity: 0.3 },
  },
});

chart.render();
