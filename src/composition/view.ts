import { deepMix } from '@antv/util';
import { CompositionComponent as CC } from '../runtime';
import { ViewComposition } from '../spec';

export type ViewOptions = Omit<ViewComposition, 'type'>;

/**
 * @todo Propagate more options to children.(e.g. filter)
 */
export const View: CC<ViewOptions> = () => {
  return (options) => {
    const { children, ...restOptions } = options;
    if (!Array.isArray(children)) return [];

    const { data: viewData, scale: viewScale = {}, ...rest } = restOptions;
    const marks = children.map(({ data = viewData, scale, ...rest }) => ({
      data,
      scale: deepMix({}, viewScale, scale),
      ...rest,
    }));
    return [{ ...rest, marks, type: 'standardView' }];
  };
};

View.props = {};
