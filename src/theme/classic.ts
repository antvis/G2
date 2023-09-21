import { deepMix } from '@antv/util';
import { ThemeComponent as TC, Theme } from '../runtime';
import { Light } from './light';

export type ClassicOptions = Theme;

/**
 * Default theme.
 */
export const Classic: TC<ClassicOptions> = (options) => {
  return deepMix(
    {},
    Light(),
    {
      category10: 'category10',
      category20: 'category20',
    },
    options,
  );
};

Classic.props = {};
