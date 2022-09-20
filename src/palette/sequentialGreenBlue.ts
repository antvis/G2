import { PaletteComponent } from '../runtime';
import { SequentialGreenBluePalette } from '../spec/palette';

export type SequentialGreenBlueOptions = Omit<
  SequentialGreenBluePalette,
  'type'
>;

/**
 * Palette of AntV for sequential data with Green-Blue theme.
 */
export const SequentialGreenBlue: PaletteComponent<
  SequentialGreenBlueOptions
> = () => {
  return [
    '#D2EDC8',
    '#A9DACC',
    '#75C6D1',
    '#42B3D5',
    '#3993C2',
    '#3073AE',
    '#27539B',
    '#1E3388',
    '#171E6D',
  ];
};

SequentialGreenBlue.props = {};
