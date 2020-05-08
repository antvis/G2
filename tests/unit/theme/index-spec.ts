import { getTheme, registerTheme } from '../../../src';
import { deepMix } from '@antv/util';

describe('theme', () => {
  test('theme API', () => {
    const defaultTheme = getTheme('default');
    expect(getTheme()).toEqual(getTheme('default'));

    // 都是 default
    expect(getTheme('xxxxx')).toEqual(getTheme('yyyyy'));

    registerTheme('default', {});
    registerTheme('a', { a: 1 });

    expect(getTheme('a')).toEqual(deepMix({}, defaultTheme, { a: 1 }));
    expect(getTheme('default')).toEqual(defaultTheme);
  });
});
