import { PaletteComponent } from '../runtime';
import { SequentialGreenPalette } from '../spec/palette';

export type SequentialGreenOptions = Omit<SequentialGreenPalette, 'type'>;

/**
 * Palette of AntV for sequential data with green theme.
 */
export const SequentialGreen: PaletteComponent<SequentialGreenOptions> = () => {
  return [
    '#9DF5CA',
    '#61DDAA',
    '#42C090',
    '#19A576',
    '#008A5D',
    '#006F45',
    '#00562F',
    '#003E19',
    '#002800',
  ];
};

SequentialGreen.props = {};
