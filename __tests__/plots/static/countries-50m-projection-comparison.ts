import { feature } from 'topojson';
import {
  geoPolyconic,
  geoRectangularPolyconic,
  // @ts-ignore
} from '@antv/vendor/d3-geo-projection';
import { G2Spec } from '../../../src';

export async function countries50mProjectionComparison(): Promise<G2Spec> {
  const world = await fetch('data/countries-50m.json').then((res) =>
    res.json(),
  );
  const land = feature(world, world.objects.land).features;
  const worldMap = (projection, color, opacity = 0.7) => {
    return {
      type: 'geoView',
      coordinate: {
        type: projection,
        size: 'fitWidth',
      },
      children: [
        { type: 'geoPath', data: land, style: { fill: color, opacity } },
        {
          type: 'geoPath',
          data: { type: 'graticule10' },
          style: {
            fill: 'none',
            stroke: color,
            strokeOpacity: 0.3,
          },
        },
        {
          type: 'geoPath',
          data: { type: 'sphere' },
          style: { fill: 'none', stroke: color, opacity },
        },
      ],
    };
  };
  return {
    type: 'spaceLayer',
    width: 1000,
    height: 700,
    children: [
      worldMap(geoPolyconic, 'red'),
      worldMap(geoRectangularPolyconic, 'blue'),
    ],
  };
}
