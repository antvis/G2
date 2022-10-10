import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('theme', () => {
  it('render({...}) basic interval with default theme', (done) => {
    const chart = render<G2Spec>(
      {
        width: 320,
        height: 180,
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
        },
        labels: [{ text: 'sold' }],
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });

  it('render({...}) interval with innerLabel', (done) => {
    const chart = render<G2Spec>(
      {
        width: 320,
        height: 180,
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
        },
        labels: [{ text: 'sold', position: 'inside' }],
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });

  it('render({...}) basic line with default theme', (done) => {
    const chart = render<G2Spec>(
      {
        width: 320,
        height: 180,
        type: 'line',
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
        },
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });

  it('render({...}) basic area with default theme', (done) => {
    const chart = render<G2Spec>(
      {
        width: 320,
        height: 180,
        type: 'area',
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
        },
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });

  it('render({...}) basic cell with default theme', (done) => {
    const chart = render<G2Spec>(
      {
        width: 320,
        height: 180,
        type: 'cell',
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
        },
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });

  it('render({...}) should render basic box with box shape', () => {
    const chart = render<G2Spec>({
      type: 'box',
      data: [
        { x: 'Oceania', y: [1, 9, 16, 22, 24] },
        { x: 'East Europe', y: [1, 5, 8, 12, 16] },
        { x: 'Australia', y: [1, 8, 12, 19, 26] },
        { x: 'South America', y: [2, 8, 12, 21, 28] },
        { x: 'North Africa', y: [1, 8, 14, 18, 24] },
        { x: 'North America', y: [3, 10, 17, 28, 30] },
        { x: 'West Europe', y: [1, 7, 10, 17, 22] },
        { x: 'West Africa', y: [1, 6, 8, 13, 16] },
      ],
      encode: {
        x: 'x',
        y: 'y',
      },
      scale: {
        x: { paddingInner: 0.6, paddingOuter: 0.3 },
        y: { zero: true },
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render basic wind vector', () => {
    const chart = render<G2Spec>({
      width: 640,
      height: 400,
      type: 'vector',
      data: {
        type: 'fetch',
        value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
      },
      encode: {
        x: 'longitude',
        y: 'latitude',
        rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
        size: ({ u, v }) => Math.hypot(v, u),
      },
      scale: {
        color: { guide: null },
        size: { range: [6, 20] },
      },
      style: {
        arrow: { size: '40%' },
      },
    });

    mount(createDiv(), chart);
  });

  it('render({...}) should render view with single annotation', () => {
    const chart = render<G2Spec>({
      title: 'Annotation.text',
      width: 200,
      height: 200,
      type: 'annotation.text',
      data: [{ x: 0.5, y: 0.5, text: 'G2' }],
      scale: {
        x: { guide: null },
        y: { guide: null },
      },
      encode: {
        x: 'x',
        y: 'y',
        text: 'text',
      },
    });
    mount(createDiv(), chart);
  });

  it('render({...}) should render view with line annotation', () => {
    const chart = render<G2Spec>({
      type: 'view',
      data: [
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
      ],
      children: [
        {
          type: 'line',
          encode: {
            x: 'year',
            y: 'value',
          },
        },
        {
          type: 'annotation.lineY',
          encode: {
            y: 30000,
          },
        },
      ],
    });

    mount(createDiv(), chart);
  });

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
            },
          },
          {
            type: 'connector',
            data: [
              { x1: 'Strategy', x2: 'Action', y1: 115, y2: 120 },
              { x1: 'Other', x2: 'Shooter', y1: 350, y2: 150 },
            ],
            encode: {
              x: ['x1', 'x2'],
              y: ['y1', 'y2'],
            },
          },
        ],
      },
      {},
      () => done(),
    );

    mount(createDiv(), chart);
  });
});
