import { G2Spec } from '../../../src';

export function population2015IntervalPie(): G2Spec {
  return {
    type: 'interval',
    height: 640,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    transform: [{ type: 'stackY' }],
    coordinate: [{ type: 'theta' }],
    scale: {
      color: {
        guide: null,
        palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,
      },
    },
    encode: {
      y: 'value',
      color: 'name',
    },
    style: {
      stroke: 'white',
    },
    labels: [
      { text: 'name', radius: 0.8, fontSize: 10, fontWeight: 'bold' },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        radius: 0.8,
        fontSize: 9,
        dy: '0.75em',
      },
    ],
    animate: {
      enter: {
        type: 'waveIn',
        duration: 1000,
      },
    },
  };
}
