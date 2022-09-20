import { PaletteComponent } from '../runtime';
import { SequentialPurplePalette } from '../spec/palette';

export type SequentialPurpleOptions = Omit<SequentialPurplePalette, 'type'>;

/**
 * Palette of AntV for sequential data with Purple theme.
 */
export const SequentialPurple: PaletteComponent<
  SequentialPurpleOptions
> = () => {
  return [
    '#FFCCFF',
    '#EBB0FF',
    '#CE95F5',
    '#B27AD8',
    '#9661BC',
    '#7B48A1',
    '#613086',
    '#48186C',
    '#2E0054',
  ];
};

SequentialPurple.props = {};
