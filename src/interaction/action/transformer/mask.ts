import { Rect, CustomEvent } from '@antv/g';
import { ActionComponent as AC } from '../../types';
import { MaskAction } from '../../../spec';

export type MaskOptions = Omit<MaskAction, 'type'>;

/**
 * @todo add Polygon mask
 * @todo add mask resize handler
 */
export const Mask: AC<MaskOptions> = (options) => {
  const { fill = '#C5D4EB', fillOpacity = 0.3 } = options;
  return (context) => {
    const { shared, transientLayer } = context;
    const { regions = [] } = shared;

    const data = regions.map((region, index) => {
      const { x, y, width, height } = region;
      return {
        x,
        y,
        width,
        height,
        fill,
        fillOpacity,
      };
    });

    transientLayer
      .selectAll('.mask')
      .data(data, (_, i) => i)
      .join(
        (enter) =>
          enter.append((style) => new Rect({ className: 'mask', style })),
        (update) =>
          update.each(function (datum) {
            this.attr(datum);
            this.dispatchEvent(new CustomEvent('maskChange'));
          }),
        (exit) => exit.remove(),
      );

    return context;
  };
};

Mask.props = {};
