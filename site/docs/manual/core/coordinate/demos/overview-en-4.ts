import { Chart } from '@antv/g2';

const baseAxis = {
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
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/cars3.json',
  },
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
  scale: { color: { palette: 'brBG', offset: (t) => 1 - t } },
  coordinate: { type: 'parallel' },
  style: { lineWidth: 1.5, strokeOpacity: 0.4 },
  legend: { color: { length: 400, layout: { justifyContent: 'center' } } },
  interaction: { tooltip: { series: false } },
  axis: {
    position: baseAxis,
    position1: baseAxis,
    position2: baseAxis,
    position3: baseAxis,
    position4: baseAxis,
    position5: baseAxis,
    position6: baseAxis,
    position7: baseAxis,
  },
});

chart.render();
