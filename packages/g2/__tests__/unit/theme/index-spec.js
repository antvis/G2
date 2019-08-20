import { expect } from 'chai';
import DefaultTheme from '../../../src/theme/default';
import * as Factory from '../../../src/theme';

describe('Theme', () => {
  it('get default theme', () => {
    expect(Factory.getTheme('default')).to.eql(DefaultTheme);
  });

  it('registerTheme && getTheme', () => {
    Factory.registerTheme('test1', {
      defaultColor: 'red',
    });

    expect(Factory.getTheme('test1')).to.eql({
      defaultColor: 'red',
    });
    expect(() => {
      Factory.registerTheme('test1', 123);
    }).to.throw();
  });
});
