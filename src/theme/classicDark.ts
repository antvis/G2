import { ThemeComponent as TC, Theme } from '../runtime';
import { Dark } from './dark';

export type ClassicDarkOptions = Theme;

/**
 * Dark theme.
 */
export const ClassicDark: TC<ClassicDarkOptions> = (options) => {
  return Object.assign(
    {},
    Dark(),
    {
      category10: 'category10',
      category20: 'category20',
    },
    options,
  );
};

ClassicDark.props = {};
