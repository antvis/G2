import { CompositionComponent as CC } from '../runtime';
import { SpaceLayerComposition } from '../spec';
import { mergeData } from './utils';

export type SpaceLayerOptions = Omit<SpaceLayerComposition, 'type'>;

/**
 * @todo Propagate more options to children.
 */
export const SpaceLayer: CC<SpaceLayerOptions> = () => {
  return (options) => {
    const { children } = options;
    if (!Array.isArray(children)) return [];
    const { x = 0, y = 0, width, height, data: layerData } = options;
    return children.map(({ data, ...rest }) => ({
      ...rest,
      data: mergeData(data, layerData),
      x,
      y,
      width,
      height,
    }));
  };
};

SpaceLayer.props = {};
