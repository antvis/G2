import { G2Spec, render } from '../../../src';
import { createDiv, mount, unmountAll } from '../../utils/dom';

describe('render', () => {
  it('render({...} renders interval chart with text annotation', () => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 300,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'genre',
              y: 'sold',
              color: 'orange',
            },
          },
          {
            type: 'annotation.text',
            encode: {
              x: 'genre',
              y: 'sold',
              text: 'sold',
            },
            style: {
              fill: 'black',
              textAlign: 'center',
              dy: -5,
            },
          },
        ],
      },
      {},
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders text annotation on specified point of line by filterBy transform.', () => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 300,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ],
        children: [
          {
            type: 'line',
            encode: {
              x: 'genre',
              y: 'sold',
            },
          },
          {
            type: 'annotation.text',
            transform: [
              { type: 'filterBy', fields: ['sold'], callback: (d) => d > 300 },
            ],
            encode: {
              x: 'genre',
              y: 'sold',
              text: 'sold',
            },
            style: {
              fill: 'black',
              textAlign: 'center',
              dy: -8,
              background: {
                fill: 'rgba(0,0,0,0.15)',
                radius: 2,
                padding: [2, 4],
              },
            },
          },
        ],
      },
      {},
    );

    mount(createDiv(), chart);
  });

  afterAll(() => {
    // unmountAll();
  });
});
