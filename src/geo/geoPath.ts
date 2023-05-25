import { CompositionComponent as CC } from '../runtime';
import { GeoPathComposition } from '../spec';

export type GeoPathOptions = Omit<GeoPathComposition, 'type'>;

/**
 * Wrap GeoPath by a GeoView.
 */
export const GeoPath: CC<GeoPathOptions> = () => {
  return (options) => {
    const { type, data, scale, encode, style, animate, key, state, ...rest } =
      options;
    return [
      {
        type: 'geoView',
        ...rest,
        children: [
          {
            type: 'geoPath',
            key: `${key}-0`,
            data: {
              value: data,
            },
            scale,
            encode,
            style,
            animate,
            state,
          },
        ],
      },
    ];
  };
};

GeoPath.props = {};
