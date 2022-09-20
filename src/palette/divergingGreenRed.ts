import { PaletteComponent } from '../runtime';
import { DivergingGreenRedPalette } from '../spec/palette';

export type DivergingGreenRedOptions = Omit<DivergingGreenRedPalette, 'type'>;

/**
 * Palette of AntV for Diverging data with Green-Red theme.
 */
export const DivergingGreenRed: PaletteComponent<
  DivergingGreenRedOptions
> = () => {
  return [
    '#014c63',
    '#10686c',
    '#168575',
    '#16a37e',
    '#0bc286',
    '#65cf9b',
    '#96dcb0',
    '#c1e8c5',
    '#F2EAEA',
    '#FFC5AC',
    '#FFA884',
    '#FF895D',
    '#FF6836',
    '#F3470D',
    '#D13808',
    '#A4300C',
    '#7A270E',
  ];
};

DivergingGreenRed.props = {};
