import * as _ from '@antv/util';
import { getTheme } from '../../../src';
import { mergeTheme } from '../../../src/util/theme';

describe('util theme', () => {
  it('mergeTheme', () => {
    const origin = { a: { b: { c: 1, d: 2 } } };
    expect(mergeTheme(origin, { a: { b: { c: 2 } } })).toEqual({ a: { b: { c: 2, d: 2 } } });

    expect(mergeTheme(origin, 'default')).toEqual(_.deepMix(origin, getTheme('default')));
  });
});
