import { PaletteComponent } from '../runtime';
import { DivergingRedBluePalette } from '../spec/palette';

export type DivergingRedBlueOptions = Omit<DivergingRedBluePalette, 'type'>;

/**
 * Palette of AntV for  Diverging data with Red-Blue theme.
 */
export const DivergingRedBlue: PaletteComponent<
  DivergingRedBlueOptions
> = () => {
  return [
    '#661900',
    '#B22C00',
    '#E6450F',
    '#FF6500',
    '#FF8C00',
    '#FFB200',
    '#FFCB33',
    '#FFDF80',
    '#E0F2EB',
    '#66D8FF',
    '#1AC5FF',
    '#007FFF',
    '#0059FF',
    '#0040FF',
    '#002CB2',
    '#FFDF80',
    '#001F7F',
  ];
};

DivergingRedBlue.props = {};
