import { PaletteComponent } from '../runtime';
import { DivergingGreenYellowPalette } from '../spec/palette';

export type DivergingGreenYellowOptions = Omit<
  DivergingGreenYellowPalette,
  'type'
>;

/**
 * Palette of AntV for Diverging data with Green-Yellow theme.
 */
export const DivergingGreenYellow: PaletteComponent<
  DivergingGreenYellowOptions
> = () => {
  return [
    '#003F7F',
    '#004C99',
    '#0059B2',
    '#0072E5',
    '#1A8CFF',
    '#4DA6FF',
    '#80BFFF',
    '#B3D9FF',
    '#EAE9EB',
    '#FFD5B1',
    '#FFC08C',
    '#FFAB66',
    '#FF963E',
    '#F17F0B',
    '#D16A0C',
    '#A45411',
    '#794012',
  ];
};

DivergingGreenYellow.props = {};
