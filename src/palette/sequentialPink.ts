import { PaletteComponent } from '../runtime';
import { SequentialPinkPalette } from '../spec/palette';

export type SequentialPinkOptions = Omit<SequentialPinkPalette, 'type'>;

/**
 * Palette of AntV for sequential data with Pink theme.
 */
export const SequentialPink: PaletteComponent<SequentialPinkOptions> = () => {
  return [
    '#FFC2EC',
    '#FFA6D0',
    '#F08BB4',
    '#D37099',
    '#B65680',
    '#9A3C67',
    '#7E214F',
    '#630038',
    '#490022',
  ];
};

SequentialPink.props = {};
