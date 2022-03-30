import { Parallel } from '../../../src/coordinate';
import { Line } from '../../../src/geometry';
import { Line as LineShape } from '../../../src/shape';
import { createDiv, mount, unmountAll } from '../../utils/dom';
import { plot } from './helper';

describe('Line', () => {
  it('Line has expected props', () => {
    expect(Line.props).toEqual({
      defaultShape: 'line',
      channels: [
        { name: 'x' },
        { name: 'y' },
        { name: 'size' },
        { name: 'series', scale: 'identity' },
        { name: 'color' },
        { name: 'position' },
        { name: 'shape' },
        { name: 'enterType' },
        { name: 'enterDelay' },
        { name: 'enterDuration' },
        { name: 'enterEasing' },
      ],
      infer: [
        { type: 'maybeTuple' },
        { type: 'maybeSeries' },
        { type: 'maybeSplitPosition' },
      ],
      shapes: ['line', 'smooth'],
    });
  });

  it('Line should draw basic line', () => {
    const container = document.createElement('div');
    const line = LineShape();
    const shapes = plot({
      mark: Line({}),
      container,
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        shape: [line, line, line],
      },
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      stroke: d.style.stroke,
      path: d.style.path,
      lineWidth: d.style.lineWidth,
    }));

    expect(attributes).toEqual([
      {
        type: 'path',
        stroke: '#5B8FF9',
        lineWidth: 1,
        path: 'M120,200L240,80L360,160',
      },
    ]);
  });

  it('Line should using size channel as lineWidth', () => {
    const container = document.createElement('div');
    const line = LineShape();
    const shapes = plot({
      mark: Line({}),
      container,
      index: [0, 1, 2],
      channel: {
        x: [[0.2], [0.4], [0.6]],
        y: [[0.5], [0.2], [0.4]],
        shape: [line, line, line],
        size: [2, 2, 2],
      },
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      lineWidth: d.style.lineWidth,
    }));

    expect(attributes).toEqual([
      {
        type: 'path',
        lineWidth: 2,
      },
    ]);
  });

  it('Line should drawing multiple lines', () => {
    const container = document.createElement('div');
    const line = LineShape();
    const shapes = plot({
      mark: Line({}),
      container,
      index: [0, 1, 2, 3, 4, 5],
      channel: {
        x: [[0.2], [0.4], [0.6], [0.5], [0.2], [0.4]],
        y: [[0.5], [0.2], [0.4], [0.2], [0.4], [0.6]],
        series: ['a', 'a', 'a', 'b', 'b', 'b'],
        color: ['steelblue', 'a', 'b', 'orange', 'c', 'd'],
        shape: [line, line, line, line, line, line],
      },
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      path: d.style.path,
      stroke: d.style.stroke,
    }));

    expect(attributes).toEqual([
      {
        type: 'path',
        stroke: 'steelblue',
        path: 'M120,200L240,80L360,160',
      },
      {
        type: 'path',
        stroke: 'orange',
        path: 'M300,80L120,160L240,240',
      },
    ]);
  });

  it('Line should drawing parallel lines', () => {
    const container = document.createElement('div');
    const line = LineShape();
    const shapes = plot({
      mark: Line({}),
      container,
      index: [0, 1, 2],
      channel: {
        'position[0]': [0.2, 0.9, 0.3],
        'position[1]': [0.3, 0.5, 0.1],
        'position[2]': [0.9, 0.4, 0.7],
        shape: [line, line, line],
      },
      transform: [Parallel()],
    });
    mount(createDiv(), container);

    const attributes = shapes.map((d) => ({
      type: d.nodeName,
      path: d.style.path,
    }));

    expect(attributes).toEqual([
      {
        type: 'path',
        path: 'M0,80L300,120L600,360',
      },
      {
        type: 'path',
        path: 'M0,360L300,200L600,160',
      },
      {
        type: 'path',
        path: 'M0,120L300,40L600,280',
      },
    ]);
  });

  it('Line should throw error without x', () => {
    const container = document.createElement('div');
    const line = LineShape();
    expect(() =>
      plot({
        mark: Line({}),
        container,
        index: [0, 1, 2],
        channel: {
          y: [[0.5], [0.2], [0.4]],
          shape: [line, line, line],
          size: [2, 2, 2],
        },
      }),
    ).toThrowError();
  });

  it('Line should throw error without y', () => {
    const container = document.createElement('div');
    const line = LineShape();
    expect(() =>
      plot({
        mark: Line({}),
        container,
        index: [0, 1, 2],
        channel: {
          x: [[0.5], [0.2], [0.4]],
          shape: [line, line, line],
          size: [2, 2, 2],
        },
      }),
    ).toThrowError();
  });

  it('Line should throw error without position', () => {
    const container = document.createElement('div');
    const line = LineShape();
    expect(() =>
      plot({
        mark: Line({}),
        container,
        index: [0, 1, 2],
        channel: {
          shape: [line, line, line],
        },
        transform: [Parallel()],
      }),
    ).toThrowError();
  });
});
