import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('label', () => {
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
          label: {
            fill: 'red',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders interval with inside label with in theta coordinate.', (done) => {
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
        coordinate: [{ type: 'theta', innerRadius: 0.5 }],
        encode: {
          color: 'genre',
          y: 'sold',
          label: 'genre',
        },
        style: { label: { position: 'inside', textAlign: 'center' } },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders interval with inside label with in transpose coordinate.', (done) => {
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
        coordinate: [{ type: 'transpose' }],
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'orange',
          label: 'genre',
        },
        style: {
          label: {
            position: 'inside',
          },
        },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders point chart with inside label', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'point',
        transform: [
          {
            type: 'fetch',
            url: 'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
          },
        ],
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
          label: 'weight',
        },
        style: { label: { position: 'inside', textBaseline: 'middle' } },
        labelLayout: [{ type: 'hideOverlap' }],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders grid chart with inside label', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'grid',
        data: [
          { name: 'A', course: 'a' },
          { name: 'A', course: 'b' },
          { name: 'B', course: 'a' },
          { name: 'B', course: 'b' },
        ],
        scale: {
          x: { flex: [2, 1] },
          y: { flex: [1, 2] },
        },
        encode: {
          y: 'name',
          x: 'course',
          label: 'course',
        },
        style: { label: { position: 'inside' } },
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });
});
