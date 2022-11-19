import { Mark } from '../../../src/composition';

describe('composition', () => {
  it('Mark({...}) should propagate data and transform to standard Mark', () => {
    const composition = Mark();
    const options = {
      type: 'interval',
      width: 200,
      height: 100,
      paddingLeft: 10,
      paddingBottom: 20,
      paddingRight: 30,
      paddingTop: 40,
      theme: { defaultColor: 'red' },
      x: 10,
      y: 20,
      component: [{ type: 'title' }],
      data: [1, 2, 3],
      scale: { x: { type: 'log' } },
      interaction: [{ type: 'elementActive' }],
      coordinate: [{ type: 'polar' }],
      transform: [{ type: 'sortBy' }],
      statistic: [{ type: 'stackY' }],
      key: '0',
    };
    expect(composition(options)).toEqual([
      {
        type: 'standardView',
        theme: { defaultColor: 'red' },
        interaction: [{ type: 'elementActive' }],
        key: '0',
        width: 200,
        height: 100,
        paddingLeft: 10,
        paddingBottom: 20,
        paddingRight: 30,
        paddingTop: 40,
        x: 10,
        y: 20,
        component: [{ type: 'title' }],
        coordinate: [{ type: 'polar' }],
        marks: [
          {
            key: '0-0',
            data: [1, 2, 3],
            scale: { x: { type: 'log' } },
            type: 'interval',
            transform: [{ type: 'sortBy' }],
            statistic: [{ type: 'stackY' }],
          },
        ],
      },
    ]);
  });
});
