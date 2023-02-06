import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from './penguins-point-brush';

export async function indicesLineBrushSeries(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        width: 800,
        paddingLeft: 50,
        data,
        axis: {
          y: { labelAutoRotate: false },
        },
        transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
        legend: false,
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
          title: (d) => new Date(d.Date).toUTCString(),
        },
      },
    ],
    interactions: [
      { type: 'brushHighlight', series: true, highlightedStroke: 'red' },
    ],
  };
}

indicesLineBrushSeries.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 400, 300, 600, 400);
      },
    },
  ];
};
