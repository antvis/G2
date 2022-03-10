import { createLibrary } from '../../../src/stdlib';
import { Canvas } from '../../../src/renderer';

describe('stdlib', () => {
  it('createLibrary() should returns expected builtin', () => {
    expect(createLibrary()).toEqual({
      'renderer.canvas': Canvas,
    });
  });
});
