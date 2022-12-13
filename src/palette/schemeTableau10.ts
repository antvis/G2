import { PaletteComponent } from '../runtime';
import { SchemeTableau10Palette } from '../spec/palette';

export type SchemeTableau10Options = Omit<SchemeTableau10Palette, 'type'>;

export const SchemeTableau10: PaletteComponent<SchemeTableau10Options> = () => {
  return [
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#9c755f',
    '#bab0ab',
  ];
};

SchemeTableau10.props = {};
