import { Layer } from '../../../src/composition';

describe('composition', () => {
  it('Layer({...}) should propagate data and space which will not be split', () => {
    const composition = Layer();
    const options = {
      type: 'layer',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: [{ data: [2, 3, 4], width: 300, height: 200, x: 1, y: 1 }, {}],
    };
    expect(composition(options)).toEqual([
      { x: 0, y: 0, width: 400, height: 300, data: [2, 3, 4] },
      { x: 0, y: 0, width: 400, height: 300, data: [1, 2, 3] },
    ]);
  });

  it('Layer({...}) should ignore children callback', () => {
    const composition = Layer();
    const options = {
      type: 'layer',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: () => {},
    };
    expect(composition(options)).toEqual([]);
  });

  it('Layer({...}) should accept x and y options', () => {
    const composition = Layer();
    const options = {
      type: 'layer',
      width: 400,
      height: 300,
      x: 100,
      y: 200,
      data: [1, 2, 3],
      children: [{ data: [2, 3, 4], width: 300, height: 200, x: 1, y: 1 }, {}],
    };
    expect(composition(options)).toEqual([
      { x: 100, y: 200, width: 400, height: 300, data: [2, 3, 4] },
      { x: 100, y: 200, width: 400, height: 300, data: [1, 2, 3] },
    ]);
  });
});
