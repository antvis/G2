import { PaletteComponent } from '../runtime';
import { SequentialRedPalette } from '../spec/palette';

export type SequentialRedOptions = Omit<SequentialRedPalette, 'type'>;

/**
 * Palette of AntV for sequential data with Red theme.
 */
export const SequentialRed: PaletteComponent<SequentialRedOptions> = () => {
  return [
    '#FFBB95',
    '#FF9E7B',
    '#FF8362',
    '#E8684A',
    '#C84D32',
    '#AA311C',
    '#8C1104',
    '#6F0000',
    '#510000',
  ];
};

SequentialRed.props = {};
