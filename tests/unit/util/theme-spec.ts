import * as _ from '@antv/util';
import { expect } from 'chai';
import { getTheme } from '../../../src';
import { mergeTheme } from '../../../src/util/theme';

describe('util padding', () => {
  it('parsePadding', () => {
    const origin = { a: { b: { c: 1, d: 2 } } };
    expect(mergeTheme(origin, { a: { b: { c: 2 } } })).to.eql({ a: { b: { c: 2, d: 2 } } });

    expect(mergeTheme(origin, 'default')).to.eql(_.deepMix(origin, getTheme('default')));
  });
});
