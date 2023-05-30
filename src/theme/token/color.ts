import { deepMix } from '@antv/util';
import { Token as G2Token } from '../../runtime';

export type ColorTokenOptions = G2Token['color'];

export const colorSeedToken: ColorTokenOptions = {
  transparent: 'transparent',
  dark: '#000',
  white: '#fff',
  red: '#F4664A',
  green: '#30BF78',
  yellow: '#FAAD14',
};

// @todo Get by algorithm.
export function getColorMappingToken(options) {
  return {
    // dark
    dark1: '#000',
    dark2: '#0D0D0D',
    dark3: '#262626',
    dark4: '#595959',
    dark5: '#8C8C8C',
    dark6: '#BFBFBF',
    dark7: '#D9D9D9',
    dark8: '#F0F0F0',

    // white
    white1: '#FFF',
    white2: '#F2F2F2',
    white3: '#D9D9D9',
    white4: '#A6A6A6',
    white5: '#737373',
    white6: '#404040',
    white7: '#262626',
    white8: '#0F0F0F',

    // red

    // green

    // yellow
  };
}

export const ColorToken = (
  options: ColorTokenOptions = {},
): ColorTokenOptions => {
  const seedToken = deepMix({}, colorSeedToken, options);

  // @todo Get by algorithm.
  const mappingToken = getColorMappingToken(seedToken);

  return deepMix({}, seedToken, mappingToken);
};
