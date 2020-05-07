import { registerTheme, getTheme } from '../../src';
import { createDiv } from '../util/dom';
import { deepMix } from '@antv/util';

describe('2377', () => {
  it('2377', () => {
    // Step 1: 注册主题
    registerTheme('newTheme', {
      defaultColor: 'red',
    });

    expect(getTheme('newTheme')).toEqual(deepMix({}, getTheme('default'), {
      defaultColor: 'red',
    }));
  });
});
