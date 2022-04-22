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
        marks: [{ data: [2, 3, 4] }, { data: [1, 2, 3] }],
      },
    ]);
  });
});
