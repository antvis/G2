import { Interval } from '../../../src/geometry';
import { ShapeRect } from '../../../src/shape';
import { Band } from '../../../src/scale';
import { createDiv, mount, unmountAll } from '../../utils/dom';
import { plot } from './helper';

describe('Interval', () => {
  it('Interval has expected props', () => {
    expect(Interval.props).toEqual({
      defaultShape: 'rect',
      channels: [
        { name: 'x', scale: 'band', required: true },
        { name: 'y', required: true },
        { name: 'series', scale: 'band' },
        { name: 'color' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeZeroX1' },
        { type: 'maybeZeroY2' },
      ],
      shapes: ['rect', 'hollowRect'],
    });
  });

  it('Interval() returns a function transforming values into interval shapes', () => {
    const container = document.createElement('div');
    const rect = ShapeRect();
    const shapes = plot({
      mark: Interval({}),
      container,
      index: [0, 1, 2],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
      },
      channel: {
        x: [[0], [1 / 3], [2 / 3]],
        shape: [rect, rect, rect],
        y: [
          [0.6, 1],
          [0.4, 1],
          [0.2, 1],
        ],
      },
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      x: d.style.x,
      y: d.style.y,
      width: d.style.width,
      height: d.style.height,
      fill: d.style.fill,
    }));
    expect(attributes).toEqual([
      {
        type: 'rect',
        fill: '#5B8FF9',
        x: 0,
        y: 240,
        width: 200,
        height: 160,
      },
      {
        type: 'rect',
        fill: '#5B8FF9',
        x: 200,
        y: 160,
        width: 200,
        height: 240,
      },
      {
        type: 'rect',
        fill: '#5B8FF9',
        x: 400,
        y: 80,
        width: 200,
        height: 320,
      },
    ]);
  });

  it('Interval() returns a function handle series channel', () => {
    const container = document.createElement('div');
    const rect = ShapeRect();
    const shapes = plot({
      mark: Interval({}),
      container,
      index: [0, 1, 2, 3, 4, 5],
      scale: {
        x: Band({
          domain: ['a', 'b', 'c'],
          range: [0, 1],
        }),
        series: Band({ domain: ['1', '2'], range: [0, 1] }),
      },
      channel: {
        shape: [rect, rect, rect, rect, rect, rect],
        x: [[0], [1 / 3], [2 / 3], [0], [1 / 3], [2 / 3]],
        y: [
          [0.6, 1],
          [0.5, 1],
          [0.8, 1],
          [0.3, 1],
          [0.2, 1],
          [0.3, 1],
        ],
        series: [0, 0, 0, 1 / 2, 1 / 2, 1 / 2],
        color: [
          'steelblue',
          'steelblue',
          'steelblue',
          'orange',
          'orange',
          'orange',
        ],
      },
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      x: d.style.x,
      y: d.style.y,
      width: d.style.width,
      height: d.style.height,
      fill: d.style.fill,
    }));
    expect(attributes).toEqual([
      {
        type: 'rect',
        fill: 'steelblue',
        x: 0,
        y: 240,
        width: 100,
        height: 160,
      },
      {
        type: 'rect',
        fill: 'steelblue',
        width: 100,
        height: 200,
        x: 200,
        y: 200,
      },
      {
        type: 'rect',
        fill: 'steelblue',
        width: 99.99999999999994,
        x: 400,
        y: 320,
        height: 80,
      },
      {
        type: 'rect',
        fill: 'orange',
        width: 100,
        x: 100,
        y: 120,
        height: 280,
      },
      {
        type: 'rect',
        fill: 'orange',
        width: 100,
        height: 320,
        x: 300,
        y: 80,
      },
      {
        type: 'rect',
        fill: 'orange',
        width: 99.99999999999994,
        height: 280,
        x: 500,
        y: 120,
      },
    ]);
  });

  afterAll(() => {
    unmountAll();
  });
});
