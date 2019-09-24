import { expect } from 'chai';
import { getTheme, registerTheme } from '../../../src';

describe('theme', () => {
  expect(getTheme()).to.eql(getTheme('default'));

  // 都是 default
  expect(getTheme('xxxxx')).to.eql(getTheme('yyyyy'));

  registerTheme('default', {});
  registerTheme('a', { a: 1 });

  expect(getTheme('a')).to.eql({ a: 1 });
  expect(getTheme('default')).to.eql({});
});
