import { getAnimation, registerAnimation } from '../../../src/animate/animation';

describe('Animation', () => {
  it('registerAnimation && getAnimation', () => {
    registerAnimation('test', () => {});

    expect(getAnimation('text')).toBeUndefined();
    expect(getAnimation('whatever')).toBeUndefined();
  });
});
