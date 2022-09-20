import { PaletteComponent } from '../runtime';
import { SequentialPinkPurplePalette } from '../spec/palette';

export type SequentialPinkPurpleOptions = Omit<
  SequentialPinkPurplePalette,
  'type'
>;

/**
 * Palette of AntV for sequential data with Pink-Purple theme.
 */
export const SequentialPinkPurple: PaletteComponent<
  SequentialPinkPurpleOptions
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

SequentialPinkPurple.props = {};
