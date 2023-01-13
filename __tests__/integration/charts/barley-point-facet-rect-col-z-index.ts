import { csv } from 'd3-fetch';
import { autoType } from 'd3-dsv';
import { groupSort, median } from 'd3-array';
import { G2Spec } from '../../../src';

export async function barleyPointFacetRectColZIndex(): Promise<G2Spec> {
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
    paddingBottom: 60,
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
        type: 'view',
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
            axis: { y: { labelAutoRotate: false } },
          },
          {
            type: 'lineY',
            data: ['Glabron'],
            zIndex: -1,
            style: {
              lineWidth: 2,
              strokeOpacity: 1,
              stroke: 'gray',
            },
          },
        ],
      },
    ],
  };
}

barleyPointFacetRectColZIndex.maxError = 1000;
