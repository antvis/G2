import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

const axis = {
  zIndex: 1,
  titlePosition: 'right',
  line: true,
  style: {
    labelStroke: '#fff',
    labelStrokeWidth: 5,
    labelFontSize: 10,
    labelStrokeLineJoin: 'round',
    titleStroke: '#fff',
    titleFontSize: 10,
    titleStrokeWidth: 5,
    titleStrokeLineJoin: 'round',
    titleTransform: 'translate(-50%, 0) rotate(-90)',
    lineStroke: 'black',
    tickStroke: 'black',
    lineStrokeWidth: 1,
  },
};

chart.options({
  type: 'line',
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
      '0-60 mph (s)',
      'year',
    ],
    color: 'weight (lb)',
  },
  style: {
    lineWidth: 1.5,
    strokeOpacity: 0.4,
  },
  scale: {
    color: {
      type: 'sequential',
      palette: 'brBG',
      offset: (t) => 1 - t,
    },
  },
  legend: {
    color: {
      length: 400,
      layout: { justifyContent: 'center' },
    },
  },
  state: {
    active: { lineWidth: 5 },
    inactive: { stroke: '#eee', opacity: 0.5 },
  },
  axis: Object.fromEntries(
    Array.from({ length: 7 }, (_, i) => [
      `position${i === 0 ? '' : i}`,
      {
        ...axis,
        title: true,
      },
    ]),
  ),
  interaction: {
    brushAxisHighlight: {
      maskFill: '#000',
      maskFillOpacity: 0.2,
      maskStroke: '#1890ff',
      maskLineWidth: 1,
    },
    tooltip: false,
  },
});

chart.render();
