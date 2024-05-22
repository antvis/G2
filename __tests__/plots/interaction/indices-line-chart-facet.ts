import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export async function indicesLineChartFacet(): Promise<G2Spec> {
  const data = await csv('data/indices.csv', autoType);
  return {
    type: 'facetRect',
    height: 600,
    width: 700,
    paddingRight: 80,
    paddingBottom: 50,
    paddingLeft: 60,
    encode: { y: 'Symbol' },
    scale: { y: { paddingInner: 0.2 } },
    data,
    children: [
      {
        type: 'line',
        frame: false,
        scale: { y: { nice: true, facet: false } },
        axis: { y: { labelAutoHide: false } },
        encode: {
          x: 'Date',
          y: 'Close',
          color: 'Symbol',
          key: 'Symbol',
        },
        tooltip: {
          title: (d) => new Date(d.Date).toUTCString(),
        },
        interaction: { tooltip: false },
      },
    ],
    interaction: {
      tooltip: {
        series: true,
        facet: true,
        body: false,
        crosshairsY: true,
        crosshairsYLineWidth: 30,
        marker: false,
      },
    },
  };
}

indicesLineChartFacet.tooltip = true;
indicesLineChartFacet.steps = ({ canvas }) => {
  const { document } = canvas;
  const [plot] = document.getElementsByClassName(PLOT_CLASS_NAME);
  return [
    step(plot, 'pointermove', {
      offsetX: 450,
      offsetY: 350,
    }),
  ];
};
