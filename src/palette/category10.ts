import { PaletteComponent } from '../runtime';
import { Category10Palette } from '../spec/palette';

export type Category10Options = Omit<Category10Palette, 'type'>;

/**
 * Classic palette of AntV for ordinal data with 10 colors.
 */
export const Category10: PaletteComponent<Category10Options> = () => {
  return [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#6F5EF9',
    '#6DC8EC',
    '#945FB9',
    '#FF9845',
    '#1E9493',
    '#FF99C3',
  ];
};

Category10.props = {};
