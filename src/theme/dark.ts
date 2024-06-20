import { deepMix } from '@antv/util';
import { ThemeComponent as TC, Theme } from '../runtime';
import { create } from './create';

export type DarkOptions = Theme;

export const tokens = {
  colorBlack: '#fff',
  colorWhite: '#000',
  colorStroke: '#416180',
  colorDefault: '#1783FF',
  colorBackground: 'transparent',
  category10: [
    '#1783FF',
    '#00C9C9',
    '#F0884D',
    '#D580FF',
    '#7863FF',
    '#60C42D',
    '#BD8F24',
    '#FF80CA',
    '#2491B3',
    '#17C76F',
  ],
  category20: [
    '#1783FF',
    '#00C9C9',
    '#F0884D',
    '#D580FF',
    '#7863FF',
    '#60C42D',
    '#BD8F24',
    '#FF80CA',
    '#2491B3',
    '#17C76F',
    '#AABA01',
    '#BC7CFC',
    '#237CBC',
    '#2DE379',
    '#CE8032',
    '#FF7AF4',
    '#545FD3',
    '#AFE410',
    '#D8C608',
    '#FFA1E0',
  ],
  padding1: 8,
  padding2: 12,
  padding3: 20,
  alpha90: 0.9,
  alpha65: 0.65,
  alpha45: 0.45,
  alpha25: 0.25,
  alpha10: 0.25,
};

const defaults = create(tokens);

export const Dark: TC<DarkOptions> = (options) => {
  return deepMix(
    {},
    defaults,
    {
      tooltip: {
        crosshairsStroke: '#fff',
        crosshairsLineWidth: 1,
        crosshairsStrokeOpacity: 0.25,
        css: {
          '.g2-tooltip': {
            background: '#1f1f1f',
            opacity: 0.95,
          },
          '.g2-tooltip-title': {
            color: '#A6A6A6',
          },
          '.g2-tooltip-list-item-name-label': {
            color: '#A6A6A6',
          },
          '.g2-tooltip-list-item-value': {
            color: '#A6A6A6',
          },
        },
      },
    },
    options,
  );
};
