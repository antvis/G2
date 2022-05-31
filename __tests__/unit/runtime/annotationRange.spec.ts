import { G2Spec, render } from '../../../src';
import { createDiv, mount } from '../../utils/dom';

describe('range Annotation', () => {
  it('render({...} renders interval chart with rangeX annotation', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 150 },
          { genre: 'Other', sold: 350 },
        ],
        scale: { x: { flex: [1, 2, 3, 4, 2] } },
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
            type: 'annotation.rangeX',
            data: [
              { x1: 'Sports', x2: 'Action' },
              { x2: 'Shooter', x1: 'Shooter', value: 12 },
            ],
            scale: {
              color: {
                independent: true,
                guide: null,
                range: ['rgba(220,220,220, 0.4)', 'rgba(255,0,0, 0.15)'],
              },
            },
            encode: {
              x: ['x1', 'x2'],
              color: (_, i) => i,
            },
            style: {
              stroke: 'red',
              lineWidth: 1,
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders rangeX annotation with identity scale.', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 150 },
          { genre: 'Other', sold: 350 },
        ],
        children: [
          {
            type: 'annotation.rangeX',
            scale: {
              x: { domain: [0, 1], independent: true, guide: null },
            },
            data: [{ x1: 0.01, x2: 0.4 }],
            encode: {
              x: ['x1', 'x2'],
            },
            style: {
              fill: 'rgba(220,220,220,0.3)',
            },
          },
          {
            type: 'interval',
            encode: {
              x: 'genre',
              y: 'sold',
              color: 'genre',
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders interval chart with rangeY annotation', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { name: '张伟', value: 95 },
          { name: '王秀英', value: 94 },
          { name: '李明', value: 92 },
          { name: '王丽', value: 89 },
          { name: '刘洋', value: 80 },
          { name: '何勇', value: 80 },
          { name: '王强', value: 78 },
          { name: '林杰', value: 76 },
          { name: '李桂英', value: 75 },
          { name: '何秀兰', value: 73 },
          { name: '卢芳', value: 68 },
          { name: '张德', value: 61 },
        ],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'name',
              y: 'value',
            },
          },
          {
            type: 'annotation.rangeY',
            // todo add 'max'.
            data: [{ val1: 80, val2: 100 }],
            encode: {
              y: ['val1', 'val2'],
            },
            style: {
              fill: 'rgba(220,220,220,0.3)',
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders rangeY annotation with identity scale.', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { name: '张伟', value: 95 },
          { name: '王秀英', value: 94 },
          { name: '李明', value: 92 },
          { name: '王丽', value: 89 },
          { name: '刘洋', value: 80 },
        ],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'name',
              y: 'value',
            },
          },
          {
            type: 'annotation.rangeY',
            scale: {
              y: { independent: true, guide: null, domain: [0, 1] },
            },
            data: [{ val1: 0.2, val2: 0.4 }],
            encode: {
              y: ['val1', 'val2'],
            },
            style: {
              fill: 'rgba(220,220,220,0.3)',
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders range annotation', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { name: '张伟', value: 95 },
          { name: '王秀英', value: 94 },
          { name: '李明', value: 92 },
          { name: '王丽', value: 89 },
          { name: '刘洋', value: 80 },
        ],
        children: [
          {
            type: 'interval',
            encode: {
              x: 'name',
              y: 'value',
            },
          },
          {
            type: 'annotation.range',
            scale: {
              y: { independent: true, guide: null, domain: [0, 1] },
            },
            data: [{ x1: '张伟', x2: '李明', val1: 0.5, val2: 1 }],
            encode: {
              x: ['x1', 'x2'],
              y: ['val1', 'val2'],
            },
            style: {
              fill: 'rgba(220,220,220,0.3)',
            },
          },
        ],
      },
      {},
      done,
    );

    mount(createDiv(), chart);
  });

  it('render({...} renders range annotation in polar coordinate.', (done) => {
    const chart = render<G2Spec>(
      {
        type: 'view',
        height: 200,
        data: [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 150 },
          { genre: 'Other', sold: 350 },
        ],
        coordinate: [{ type: 'polar' }],
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
            type: 'annotation.range',
            data: [{ x1: 'Sports', x2: 'Strategy', y2: 0, y1: 1.1 }],
            scale: { y: { domain: [0, 1], independent: true, guide: null } },
            encode: {
              x: ['x1', 'x2'],
              y: ['y1', 'y2'],
            },
            style: {
              fill: 'rgba(220,220,220,0.3)',
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
