import { csv } from '@antv/vendor/d3-fetch';
import { autoType } from '@antv/vendor/d3-dsv';
import { groupSort, median } from '@antv/vendor/d3-array';
import { G2Spec } from '../../../src';

export async function barleyPointFacetRectCol(): Promise<G2Spec> {
  const data = await csv('data/barley.csv', autoType);
  return {
    type: 'facetRect',
    data: data,
    height: 800,
    encode: {
      y: 'site',
    },
    paddingLeft: 130,
    paddingRight: 120,
    paddingBottom: 50,
    scale: {
      y: {
        domain: groupSort<any, any>(
          data,
          (g) => -(median(g, (d) => d.yield) as number),
          (d) => d.site,
        ),
      },
    },
    children: [
      {
        type: 'point',
        insetLeft: 5,
        insetRight: 5,
        scale: {
          color: { type: 'ordinal' },
          y: {
            domain: groupSort<any, any>(
              data,
              (g) => -(median(g, (d) => d.yield) as number),
              (d) => d.variety,
            ),
          },
        },
        encode: {
          x: 'yield',
          y: 'variety',
          color: 'year',
          shape: 'hollow',
        },
        axis: { y: { labelAutoHide: false } },
      },
    ],
  };
}
