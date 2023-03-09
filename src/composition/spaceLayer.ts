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
    const {
      x: viewX = 0,
      y: viewY = 0,
      width: viewWidth,
      height: viewHeight,
      data: layerData,
    } = options;
    return children.map(({ data, x, y, width, height, ...rest }) => ({
      ...rest,
      data: mergeData(data, layerData),
      x: x ?? viewX,
      y: y ?? viewY,
      width: width ?? viewWidth,
      height: height ?? viewHeight,
    }));
  };
};

SpaceLayer.props = {};
