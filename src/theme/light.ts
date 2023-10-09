import { deepMix } from '@antv/util';
import { ThemeComponent as TC, Theme } from '../runtime';
import { create } from './create';

export const tokens = {
  colorBlack: '#1D2129',
  colorWhite: '#ffffff',
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
  alpha10: 0.1,
};

const defaults = create(tokens);

export type LightOptions = Theme;

/**
 * Default theme.
 */
export const Light: TC<LightOptions> = (options) => {
  return deepMix({}, defaults, options);
};

Light.props = {};
