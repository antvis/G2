import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';

export type MaybeFunctionAttributeOptions = Record<string, never>;

/**
 * Mark functional attribute constant.
 */
export const MaybeFunctionAttribute: TC<MaybeFunctionAttributeOptions> = () => {
  return (I, mark) => {
    const { style = {} } = mark;
    return [
      I,
      deepMix({}, mark, {
        style: {
          ...style,
          ...Object.fromEntries(
            Object.entries(style)
              .filter(([, v]) => typeof v === 'function')
              .map(([k, v]) => [k, () => v]),
          ),
        },
      }),
    ];
  };
};

MaybeFunctionAttribute.props = {};
