import { PaletteComponent } from '../runtime';
import { DivergingRedPurplePalette } from '../spec/palette';

export type DivergingRedPurpleOptions = Omit<DivergingRedPurplePalette, 'type'>;

/**
 * Palette of AntV for  Diverging data with Red-Purple theme.
 */
export const DivergingRedPurple: PaletteComponent<
  DivergingRedPurpleOptions
> = () => {
  return [
    '#661900',
    '#B22C00',
    '#E6450F',
    '#FF6500',
    '#FF8C00',
    '#FFB200',
    '#FFCB33',
    '#FFDF80',
    '#FFE2DC',
    '#EAACFF',
    '#DD78FF',
    '#C53FFF',
    '#A700FF',
    '#8500FF',
    '#620BE1',
    '#3607C2',
    '#27029A',
  ];
};

DivergingRedPurple.props = {};
