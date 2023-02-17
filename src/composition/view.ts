import { deepMix } from '@antv/util';
import { CompositionComponent as CC } from '../runtime';
import { ViewComposition } from '../spec';
import { mergeData } from './utils';

export type ViewOptions = Omit<ViewComposition, 'type'>;

/**
 * @todo Propagate more options to children.(e.g. filter)
 * @todo Propagate encode options to children. This is useful for Matrix composition.
 * @todo Move this to runtime, do not treat it as a composition to cause confusion.
 */
export const View: CC<ViewOptions> = () => {
  return (options) => {
    const { children, ...restOptions } = options;
    if (!Array.isArray(children)) return [];
    const {
      data: viewData,
      scale: viewScale = {},
      axis: viewAxis = {},
      legend: viewLegend = {},
      encode: viewEncode = {},
      transform: viewTransform = [],
      ...rest
    } = restOptions;
    const marks = children.map(
      ({
        data,
        scale = {},
        axis = {},
        legend = {},
        encode = {},
        transform = [],
        ...rest
      }) => ({
        data: mergeData(data, viewData),
        scale: deepMix({}, viewScale, scale),
        encode: deepMix({}, viewEncode, encode),
        transform: [...viewTransform, ...transform],
        axis: axis && viewAxis ? deepMix({}, viewAxis, axis) : false,
        legend: legend && viewLegend ? deepMix({}, viewLegend, legend) : false,
        ...rest,
      }),
    );
    return [{ ...rest, marks, type: 'standardView' }];
  };
};

View.props = {};
