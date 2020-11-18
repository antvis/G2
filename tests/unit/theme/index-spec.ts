import { getTheme, registerTheme } from '../../../src';
import { deepMix } from '@antv/util';

describe('theme', () => {
  test('theme API', () => {
    const defaultTheme = getTheme('default');
    const stringify = (obj) => JSON.stringify(obj)
    expect(stringify(getTheme())).toEqual(stringify(getTheme('default')));

    // 都是 default
    expect(stringify(getTheme('xxxxx'))).toEqual(stringify(getTheme('yyyyy')));

    registerTheme('default', {});
    registerTheme('a', { a: 1 });

    expect(stringify(getTheme('a'))).toEqual(stringify(deepMix({}, defaultTheme, { a: 1 })));
    expect(stringify(getTheme('default'))).toEqual(stringify(defaultTheme));
  });
});
