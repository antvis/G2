import { PaletteComponent } from '../runtime';
import { SequentialDarkGreenPalette } from '../spec/palette';

export type SequentialDarkGreenOptions = Omit<
  SequentialDarkGreenPalette,
  'type'
>;

/**
 * Palette of AntV for sequential data with dark green theme.
 */
export const SequentialDarkGreen: PaletteComponent<
  SequentialDarkGreenOptions
> = () => {
  return [
    '#8CF4F2',
    '#6FD8D6',
    '#52BCBA',
    '#31A09F',
    '#008685',
    '#006C6C',
    '#005354',
    '#003B3D',
    '#002627',
  ];
};

SequentialDarkGreen.props = {};
