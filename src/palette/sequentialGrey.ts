import { PaletteComponent } from '../runtime';
import { SequentialGreyPalette } from '../spec/palette';

export type SequentialGreyOptions = Omit<SequentialGreyPalette, 'type'>;

/**
 * Palette of AntV for sequential data with grey theme.
 */
export const SequentialGrey: PaletteComponent<SequentialGreyOptions> = () => {
  return [
    '#D0E4FF',
    '#B4C8ED',
    '#99ADD1',
    '#7E92B5',
    '#65789B',
    '#4C6080',
    '#334867',
    '#1B324F',
    '#021D38',
  ];
};

SequentialGrey.props = {};
