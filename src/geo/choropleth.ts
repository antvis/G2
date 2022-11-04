import { CompositionComponent as CC } from '../runtime';
import { ChoroplethComposition } from '../spec';

export type ChoroplethOptions = Omit<ChoroplethComposition, 'type'>;

/**
 * Wrap choropleth by a GeoView.
 */
export const Choropleth: CC<ChoroplethOptions> = () => {
  return (options) => {
    const { type, data, scale, encode, style, animate, ...rest } = options;
    return [
      {
        type: 'geoView',
        ...rest,
        children: [
          {
            type: 'choropleth',
            data: {
              value: data,
            },
            scale,
            encode,
            style,
            animate,
          },
        ],
      },
    ];
  };
};

Choropleth.props = {};
