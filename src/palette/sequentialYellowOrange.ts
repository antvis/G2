import { PaletteComponent } from '../runtime';
import { SequentialYellowOrangePalette } from '../spec/palette';

export type SequentialYellowOrangeOptions = Omit<
  SequentialYellowOrangePalette,
  'type'
>;

/**
 * Palette of AntV for sequential data with yellow-orange theme.
 */
export const SequentialYellowOrange: PaletteComponent<
  SequentialYellowOrangeOptions
> = () => {
  return [
    '#FDEDBE',
    '#FFDF80',
    '#FFCB33',
    '#FFB200',
    '#FF8C00',
    '#FF6500',
    '#E6450F',
    '#B22C00',
    '#661900',
  ];
};

SequentialYellowOrange.props = {};
