import { CompositionComponent as CC } from '../runtime';
import { LayerComposition } from '../spec';
import { mergeData } from './utils';

export type LayerOptions = Omit<LayerComposition, 'type'>;

/**
 * @todo Propagate more options to children.
 */
export const Layer: CC<LayerOptions> = () => {
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

Layer.props = {};
