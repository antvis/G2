import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function missingAreaTooltipMarker(): G2Spec {
  return {
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close: d.date.getUTCMonth() <= 3 ? NaN : d.close,
          }),
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    style: {
      connect: true,
      connectFill: 'grey',
      connectFillOpacity: 0.15,
    },
    interaction: {
      tooltip: {
        body: false,
        markerR: 10,
        markerLineWidth: 5,
        markerStroke: '#aaa',
      },
    },
  };
}

missingAreaTooltipMarker.tooltip = true;

missingAreaTooltipMarker.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 100,
      offsetY: 350,
    }),
    step(plot, 'pointermove', {
      offsetX: 176,
      offsetY: 350,
    }),
  ];
};
