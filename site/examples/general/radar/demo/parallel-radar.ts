/**
 * A recreation of this demo: https://observablehq.com/@d3/parallel-coordinates
 */
import { Chart } from '@antv/g2';

const axis = {
  zIndex: 1,
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
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { type: 'radar' },
  interaction: {
    tooltip: { series: false },
  },
  children: [
    {
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
        color: {
          position: 'bottom',
          labelFormatter: '~s',
          length: 200,
          layout: { justifyContent: 'center' },
        },
      },
      axis: {
        position: axis,
        position1: axis,
        position2: axis,
        position3: axis,
        position4: axis,
        position5: axis,
        position6: axis,
        position7: axis,
      },
    },
  ],
});

chart.render();
