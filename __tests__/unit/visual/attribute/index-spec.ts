import { Attribute, Position } from '../../../../src/visual/attribute';

// TODO 单测 100%
describe('attribute', () => {
  it('export', () => {
    expect([Attribute, Position].every((e) => !!e)).toBe(true);
  });
});
