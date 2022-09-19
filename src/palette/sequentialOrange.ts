import { PaletteComponent } from '../runtime';
import { SequentialOrangePalette } from '../spec/palette';

export type SequentialOrangeOptions = Omit<SequentialOrangePalette, 'type'>;

/**
 * Palette of AntV for sequential data with orange theme.
 */
export const SequentialOrange: PaletteComponent<
  SequentialOrangeOptions
> = () => {
  return [
    '#FFC771',
    '#FFAB57',
    '#F6903D',
    '#D77622',
    '#B85C00',
    '#9B4300',
    '#7D2A00',
    '#601000',
    '#450000',
  ];
};

SequentialOrange.props = {};
