import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { brush } from './penguins-point-brush';

export async function indicesLineChartFacetBrushShared(): Promise<G2Spec> {
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
        state: {
          inactive: { opacity: '0.3' },
        },
      },
    ],
    interaction: {
      brushXHighlight: {
        facet: true,
        reverse: true,
        series: true,
      },
    },
  };
}

indicesLineChartFacetBrushShared.steps = ({ canvas }) => {
  const { document } = canvas;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  return [
    {
      changeState: () => {
        brush(plot, 100, 100, 200, 200);
      },
    },
  ];
};
