import { deepMix } from '@antv/util';
import { Token as G2Token } from '../../runtime';

export type FontTokenOptions = G2Token['font'];

export const fontSeedToken = {
  fontFamily: `"Segoe UI", Roboto, "Helvetica Neue", Arial,
  "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
  "Noto Color Emoji"`,
  fontWeight: 'normal',
  fontSize: 12,
  lineHeight: 12,
};

// @todo Get by algorithm.
function getFontMappingToken(options) {
  return {
    fontWeightNormal: 'normal',
    fontWeightLighter: 'lighter',
    fontWeightStrong: 800,

    fontSizeH1: 20,
    fontSizeH2: 18,
    fontSizeH3: 16,
    fontSizeH4: 14,
    fontSizeH5: 12,
  };
}

export const FontToken = (options: FontTokenOptions = {}): FontTokenOptions => {
  const seedToken = deepMix({}, fontSeedToken, options);
  const mappingToken = getFontMappingToken(seedToken);
  return deepMix({}, seedToken, mappingToken);
};
