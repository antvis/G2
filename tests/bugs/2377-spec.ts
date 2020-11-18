import { registerTheme, getTheme } from '../../src';
import { deepMix } from '@antv/util';

describe('2377', () => {
  it('2377', () => {
    // Step 1: 注册主题
    registerTheme('newTheme', {
      defaultColor: 'red',
    });

    expect(JSON.stringify(getTheme('newTheme'))).toBe(
      JSON.stringify(
        deepMix({}, getTheme('default'), {
          defaultColor: 'red',
        })
      )
    );
  });
});
