import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('label', () => {
  it('render({...} renders chart with basic label', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'orange',
          label: 'sold',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders label with specified label options', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'interval',
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'orange',
          label: 'sold',
        },
        style: {
          labelFill: 'red',
          labelFontSize: 20,
          labelFontWeight: 'bold',
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });
});
