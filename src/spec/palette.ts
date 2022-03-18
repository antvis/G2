import { PaletteComponent } from '../runtime';
import { Category10Options, Category20Options } from '../palette';

export type Palette = Category10 | Category20;

export type PaletteTypes = 'category10' | 'category20';

export type BasePalette<T extends PaletteTypes, O = Record<string, unknown>> = {
  type?: T | PaletteComponent;
} & O;

export type Category10 = BasePalette<'category10', Category10Options>;

export type Category20 = BasePalette<'category20', Category20Options>;
