import { PaletteComponent } from '../runtime';

export type Palette = Category10Palette | Category20Palette | CustomPalette;

export type PaletteTypes = 'category10' | 'category20' | PaletteComponent;

export type Category10Palette = {
  type?: 'category10';
};

export type Category20Palette = {
  type?: 'category20';
};

export type CustomPalette = {
  type?: PaletteComponent;
  [key: string]: any;
};
