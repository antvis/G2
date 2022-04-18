import { CompositionComponent as CC } from '../runtime';
import { Layer as LayerSpec } from '../spec';

export type LayerOptions = Omit<LayerSpec, 'type'>;

export const Layer: CC<LayerOptions> = () => {
  return (options) => {
    const { x = 0, y = 0, width, height, children, data: layerData } = options;
    return children.map(({ data = layerData, ...rest }) => ({
      ...rest,
      data,
      x,
      y,
      width,
      height,
    }));
  };
};

Layer.props = {};
