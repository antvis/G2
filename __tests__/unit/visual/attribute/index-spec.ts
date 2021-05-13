import { Attribute, Color, Position, Shape, Size } from '@g2/visual/attribute';

// TODO 单测 100%
describe('attribute', () => {
  it('export', () => {
    expect([Attribute, Color, Position, Shape, Size].every((e) => !!e)).toBe(true);
  });
});
