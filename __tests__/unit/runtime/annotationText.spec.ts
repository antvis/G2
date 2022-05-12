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
              textAlign: 'center',
              dy: -4,
              fill: 'black',
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
              fill: '#2C3542',
              fillOpacity: 0.65,
              textAlign: 'center',
              dy: -4,
              fontSize: 10,
              background: {
                fill: '#416180',
                fillOpacity: 0.15,
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

  it('render({...} renders text annotation support custom text style.', () => {
    const { cos, sin, PI } = Math;
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
              text: '本月销量最大值',
              wordWrap: true,
              wordWrapWidth: 46,
              fill: '#2C3542',
              fillOpacity: 0.65,
              textAlign: 'left',
              dy: 10,
              dx: 4,
              fontSize: 10,
              background: {
                fill: '#416180',
                fillOpacity: 0.15,
                radius: 2,
                padding: [2, 4],
              },
              startMarker: {
                fill: 'orange',
                fillOpacity: 1,
                size: 18,
                symbol: (x, y, r) => {
                  const path = [];
                  for (let i = 0; i < 5; i++) {
                    path.push([
                      i === 0 ? 'M' : 'L',
                      (cos(((18 + i * 72) * PI) / 180) * r) / 2 + x,
                      (-sin(((18 + i * 72) * PI) / 180) * r) / 2 + y,
                    ]);
                    path.push([
                      'L',
                      (cos(((54 + i * 72) * PI) / 180) * r) / 4 + x,
                      (-sin(((54 + i * 72) * PI) / 180) * r) / 4 + y,
                    ]);
                  }
                  path.push(['Z']);
                  return path;
                },
              },
              connector: {
                stroke: '#416180',
                strokeOpacity: 0.45,
              },
            },
          },
        ],
      },
      {},
    );

    mount(createDiv(), chart);
  });

  it.only('render({...} renders text annotation with badge shape.', () => {
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
            data: [{ genre: 'Shooter', sold: 350 }],
            encode: {
              x: 'genre',
              y: 'sold',
              text: 'sold',
              shape: 'annotation.badge',
            },
            style: {
              textAlign: 'center',
              position: 'top-right',
              content: 'Top',
              size: 24,
              textStyle: {
                fontSize: 10,
                fill: '#fff',
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
