import { View } from '../../../src/composition';

describe('composition', () => {
  it('View({...}) should propagate data and transform to standard view', () => {
    const composition = View();
    const options = {
      type: 'view',
      data: [1, 2, 3],
      children: [{ data: [2, 3, 4] }, {}],
    };
    expect(composition(options)).toEqual([
      {
        type: 'standardView',
        marks: [
          { data: [2, 3, 4], scale: {} },
          { data: [1, 2, 3], scale: {} },
        ],
      },
    ]);
  });

  it('View({...}) should ignore children callback', () => {
    const composition = View();
    const options = {
      type: 'layer',
      width: 400,
      height: 300,
      data: [1, 2, 3],
      children: () => {},
    };
    expect(composition(options)).toEqual([]);
  });

  it('View({...}) should propagate scale options', () => {
    const composition = View();
    const options = {
      type: 'view',
      scale: { x: { type: 'log', domain: [1, 2] } },
      children: [{ scale: { x: { domain: [2, 3], y: [1, 2] } } }],
    };
    expect(composition(options)).toEqual([
      {
        type: 'standardView',
        marks: [
          {
            data: undefined,
            scale: { x: { type: 'log', domain: [2, 3], y: [1, 2] } },
          },
        ],
      },
    ]);
  });
});
