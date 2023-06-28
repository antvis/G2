import { deepMix } from '@antv/util';
import { Token as G2Token } from '../../runtime';

export type StyleTokenOptions = G2Token['style'];

export const styleSeedToken = {
  lineWidth: 1,
  lineDash: [0, 0],
  radius: 1,
  r: 1,
};

// @todo Get by algorithm.
function getStyleMappingToken(options: StyleTokenOptions): StyleTokenOptions {
  return {
    lineWidth0: 0,
    lineWidth1: 0.5,
    lineWidth2: 1,
    lineWidth3: 1.5,
    lineWidth4: 2,
    lineWidth5: 2.5,
    lineWidth6: 3,

    lineDashSolid: [0, 0],
    lineDashDotted: [10, 10],

    radius0: 0,
    radius1: 1,
    radius2: 2,
    radius3: 3,
    radius4: 4,
    radius5: 5,
    radius6: 6,

    r0: 0,
    r1: 1,
    r2: 2,
    r3: 3,
    r4: 4,
    r5: 5,
    r6: 6,
  };
}

export const StyleToken = (
  options: StyleTokenOptions = {},
): StyleTokenOptions => {
  const seedToken = deepMix({}, styleSeedToken, options);
  const mappingToken = getStyleMappingToken(seedToken);
  return deepMix({}, seedToken, mappingToken);
};
