import { deepMix } from '@antv/util';
import { Token as G2Token } from '../../runtime';

export type PaletteTokenOptions = G2Token['palette'];

const seedToken = {
  defaultColor: '#5B8FF9',
};

const getMappingToken = (token) => {
  return {
    category10: 'category10',
    category20: 'category20',
    // sequentialPalette: []
    // divergingPalette: [],
  };
};

export const PaletteToken = (
  options: PaletteTokenOptions = {},
): PaletteTokenOptions => {
  const mappingToken = getMappingToken(deepMix({}, seedToken, options));

  return deepMix({}, seedToken, mappingToken, options);
};
