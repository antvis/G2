import { PaletteComponent } from '../runtime';
import { SequentialYellowGreenPalette } from '../spec/palette';

export type SequentialYellowGreenOptions = Omit<
  SequentialYellowGreenPalette,
  'type'
>;

/**
 * Palette of AntV for sequential data with Yellow-Green theme.
 */
export const SequentialYellowGreen: PaletteComponent<
  SequentialYellowGreenOptions
> = () => {
  return [
    '#FFEBB0',
    '#FFDF80',
    '#FACA3E',
    '#E6B80B',
    '#B5AC23',
    '#6A9A48',
    '#20876B',
    '#06746B',
    '#044E48',
  ];
};

SequentialYellowGreen.props = {};
