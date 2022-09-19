import { PaletteComponent } from '../runtime';
import { SequentialBluePalette } from '../spec/palette';

export type SequentialBlueOptions = Omit<SequentialBluePalette, 'type'>;

/**
 * Palette of AntV for sequential data with blue theme.
 */
export const SequentialBlue: PaletteComponent<SequentialBlueOptions> = () => {
  return [
    '#95F0FF',
    '#78D3F8',
    '#5AB8DB',
    '#3A9DBF',
    '#0A82A4',
    '#00698A',
    '#005170',
    '#003958',
    '#002440',
  ];
};

SequentialBlue.props = {};
