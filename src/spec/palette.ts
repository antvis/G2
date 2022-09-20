import { PaletteComponent } from '../runtime';

export type Palette = Category10Palette | Category20Palette | CustomPalette;

export type PaletteTypes = 'category10' | 'category20' | PaletteComponent;

// ------ Category ------

export type Category10Palette = {
  type?: 'category10';
};

export type Category20Palette = {
  type?: 'category20';
};

// ------ Sequential Single ------

export type SequentialBluePalette = {
  type?: 'sequentialBlue';
};

export type SequentialDarkBluePalette = {
  type?: 'sequentialDarkBlue';
};

export type SequentialGreenPalette = {
  type?: 'sequentialGreen';
};

export type SequentialDarkGreenPalette = {
  type?: 'sequentialDarkGreen';
};

export type SequentialGreyPalette = {
  type?: 'sequentialGrey';
};

export type SequentialOrangePalette = {
  type?: 'sequentialOrange';
};

export type SequentialPinkPalette = {
  type?: 'sequentialPink';
};

export type SequentialPurplePalette = {
  type?: 'sequentialPurple';
};

export type SequentialRedPalette = {
  type?: 'sequentialRed';
};

export type SequentialYellowPalette = {
  type?: 'sequentialYellow';
};

// ------ Sequential Multi ------

export type SequentialYellowOrangePalette = {
  type?: 'sequentialYellowOrange';
};

export type SequentialYellowGreenPalette = {
  type?: 'sequentialYellowGreen';
};

export type SequentialPinkPurplePalette = {
  type?: 'sequentialPinkPurple';
};

export type SequentialGreenBluePalette = {
  type?: 'sequentialGreenBlue';
};

// ------ Diverging ------

export type DivergingRedBluePalette = {
  type?: 'divergingRedBlue';
};

export type DivergingGreenRedPalette = {
  type?: 'divergingGreenRed';
};

export type DivergingGreenYellowPalette = {
  type?: 'divergingGreenYellow';
};

export type DivergingRedPurplePalette = {
  type?: 'divergingRedPurple';
};

export type CustomPalette = {
  type?: PaletteComponent;
  [key: string]: any;
};
