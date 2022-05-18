import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('connector Annotation', () => {
  it('render({...} renders interval chart with connector annotation', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 300,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 150 },
          { genre: 'Other', sold: 350 },
        ],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'genre',
              y: 'sold',
              color: 'genre',
            },
          },
          {
            type: 'annotation.connector',
            data: [
              { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
              { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
            ],
            encode: {
              x: ['x1', 'x2'],
              y: ['y1', 'y2'],
            },
            style: {
              stroke: '#979797',
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it.only('render({...} renders chart with connector annotation in transpose coordinate.', () => {
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
        coordinate: [{ type: 'transpose' }],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'genre',
              y: 'sold',
              color: 'genre',
            },
          },
          {
            type: 'annotation.connector',
            data: [
              { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
              { x1: 'Shooter', x2: 'Sports', y1: 350, y2: 275 },
            ],
            encode: {
              x: ['x1', 'x2'],
              y: ['y1', 'y2'],
            },
            style: {
              stroke: '#979797',
            },
          },
        ],
      },
      {},
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders interval chart with connector annotation in reflectY', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 300,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 150 },
          { genre: 'Other', sold: 350 },
        ],
        scale: {
          y: { range: [0, 1] },
        },
        children: [
          {
            type: 'interval',
            encode: {
              x: 'genre',
              y: 'sold',
              color: 'genre',
            },
          },
          {
            type: 'annotation.connector',
            data: [
              { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
              { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
            ],
            encode: {
              x: ['x1', 'x2'],
              y: ['y1', 'y2'],
            },
            style: {
              direction: 'downward',
              offset: 8,
              stroke: '#979797',
              endMarker: { size: 6 },
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });
});
