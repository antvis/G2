import { PaletteComponent } from '../runtime';
import { SequentialYellowPalette } from '../spec/palette';

export type SequentialYellowOptions = Omit<SequentialYellowPalette, 'type'>;

/**
 * Palette of AntV for sequential data with Yellow theme.
 */
export const SequentialYellow: PaletteComponent<
  SequentialYellowOptions
> = () => {
  return [
    '#FFD83B',
    '#F6BD16',
    '#D7A100',
    '#B98700',
    '#9C6E00',
    '#7F5600',
    '#633F00',
    '#482900',
    '#2F1400',
  ];
};

SequentialYellow.props = {};
