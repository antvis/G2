import { PaletteComponent } from '../runtime';
import { Tableau10Palette } from '../spec/palette';

export type Tableau10Options = Omit<Tableau10Palette, 'type'>;

export const Tableau10: PaletteComponent<Tableau10Options> = () => {
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

Tableau10.props = {};
