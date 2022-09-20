import { PaletteComponent } from '../runtime';
import { SequentialDarkBluePalette } from '../spec/palette';

export type SequentialDarkBlueOptions = Omit<SequentialDarkBluePalette, 'type'>;

/**
 * Palette of AntV for sequential data with dark blue theme.
 */
export const SequentialDarkBlue: PaletteComponent<
  SequentialDarkBlueOptions
> = () => {
  return [
    '#B8E1FF',
    '#9AC5FF',
    '#7DAAFF',
    '#5B8FF9',
    '#3D76DD',
    '#085EC0',
    '#0047A5',
    '#00318A',
    '#001D70',
  ];
};

SequentialDarkBlue.props = {};
