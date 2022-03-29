import { constant } from '../../../../src/transform/utils/d3-sankey/constant';

describe('constant(...) returns a function returning a constant value', () => {
  it('', () => {
    expect(typeof constant('x')).toBe('function');
    expect(constant('x')()).toBe('x');
    expect(constant('1')()).toBe('1');
    expect(constant(0)()).toBe(0);
  });
});
