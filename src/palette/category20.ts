import { PaletteComponent } from '../runtime';
import { Category20Palette } from '../spec/palette';

export type Category20Options = Omit<Category20Palette, 'type'>;

/**
 * Classic palette of AntV for ordinal data with 20 colors.
 */
export const Category20: PaletteComponent<Category20Options> = () => {
  return [
    '#5B8FF9',
    '#CDDDFD',
    '#5AD8A6',
    '#CDF3E4',
    '#5D7092',
    '#CED4DE',
    '#F6BD16',
    '#FCEBB9',
    '#6F5EF9',
    '#D3CEFD',
    '#6DC8EC',
    '#D3EEF9',
    '#945FB9',
    '#DECFEA',
    '#FF9845',
    '#FFE0C7',
    '#1E9493',
    '#BBDEDE',
    '#FF99C3',
    '#FFE0ED',
  ];
};

Category20.props = {};
