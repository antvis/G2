import { getCoordinate } from '@antv/coord';
import { getScale } from '@antv/scale';
import Interval from '../../../src/geometry/interval';
import { getTheme } from '../../../src/theme/';
import { createCanvas, createDiv } from '../../util/dom';
import { createScale } from '../../util/scale';

import 'jest-extended';

const CartesianCoordinate = getCoordinate('rect');
const PolarCoordinate = getCoordinate('polar');
const IdentityScale = getScale('identity');
const Theme = getTheme('default');

describe('State setting', () => {
  const div = createDiv();
  const canvas = createCanvas({
    container: div,
  });
  const rectCoord = new CartesianCoordinate({
    start: { x: 0, y: 180 },
    end: { x: 180, y: 0 },
  });

  it('default', () => {
    const data = [
      { a: 'A', b: 10 },
      { a: 'B', b: 12 },
      { a: 'C', b: 8 },
    ];
    const scaleDefs = {
      a: { range: [0.25, 0.75] },
      b: { min: 7 },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
    };
    const interval = new Interval({
      data,
      scaleDefs,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
    });

    interval.position('a*b').animate(false);

    interval.init({
      theme: Theme,
    });
    interval.paint();

    const activeElement = interval.elements[0];
    activeElement.setState('active', true);

    expect(activeElement.hasState('active')).toBeTrue();
    expect(activeElement.shape.attr('fillOpacity')).toBe(0.95);

    expect(interval.elements[1].hasState('active')).toBeFalse();
  });

  const data = [
    { a: 'A', b: 10 },
    { a: 'B', b: 12 },
    { a: 'C', b: 8 },
  ];
  function initInterval({ background, sortZIndex = false }) {
    const scaleDefs = {
      a: { range: [0.25, 0.75] },
      b: { min: 7 },
    };
    const scales = {
      a: createScale('a', data, scaleDefs),
      b: createScale('b', data, scaleDefs),
    };
    const interval = new Interval({
      data,
      scaleDefs,
      scales,
      coordinate: rectCoord,
      container: canvas.addGroup(),
      background,
      sortZIndex,
    });

    interval
      .position('a*b')
      .state({
        selected: {
          style: {
            stroke: '#000',
            lineWidth: 2,
          },
        },
      })
      .animate(false);

    interval.init({
      theme: Theme,
    });
    interval.paint();

    return interval;
  }

  it('state()', () => {
    const interval = initInterval({ background: false });
    const selectedElement = interval.elements[0];
    selectedElement.setState('selected', true);

    expect(selectedElement.hasState('selected')).toBeTrue();
    expect(selectedElement.shape.attr('stroke')).toBe('#000');
    expect(selectedElement.shape.attr('lineWidth')).toBe(2);

    expect(interval.elements[1].hasState('selected')).toBeFalse();
  });

  it('state with geometry shape background: 背景不会应用 state 状态样式', () => {
    const interval = initInterval({ background: {} });
    const selectedElement = interval.elements[0];
    selectedElement.setState('selected', true);

    expect(selectedElement.hasState('selected')).toBeTrue();
    // @ts-ignore
    const shape = selectedElement.shape.getChildren()[1];
    // @ts-ignore
    const backgroundShape = selectedElement.shape.getChildren()[0];
    expect(shape.attr('stroke')).toBe('#000');
    expect(shape.attr('lineWidth')).toBe(2);
    expect(backgroundShape.attr('stroke')).not.toBe('#000');
    expect(backgroundShape.attr('lineWidth')).not.toBe(2);

    expect(interval.elements[1].hasState('selected')).toBeFalse();

    interval.destroy();
  });

  it('pie selected', () => {
    const thetaCoord = new PolarCoordinate({
      start: { x: 0, y: 180 },
      end: { x: 180, y: 0 },
    });
    thetaCoord.transpose();
    // @ts-ignore
    thetaCoord.type = 'theta';
    const pieData = [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: 'Other', value: 5 },
    ];
    const pieScales = {
      type: createScale('type', pieData),
      value: createScale('value', pieData),
      '1': new IdentityScale({
        field: '1',
        values: [1],
        range: [0.5, 1],
      }),
    };

    const pie = new Interval({
      data: pieData,
      scales: pieScales,
      coordinate: thetaCoord,
      container: canvas.addGroup(),
    });

    pie.position('value').color('type').adjust('stack').animate(false);
    pie.init({
      theme: Theme,
    });
    pie.paint();

    pie.elements[0].setState('selected', true);

    expect(pie.elements[0].shape.attr('matrx')).not.toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    pie.destroy();
  });

  it('get ZIndex and setState', () => {
    const interval = initInterval({ background: false, sortZIndex: true });
    const element1 = interval.elements[1];
    const element2 = interval.elements[2];
    const shape0 = element1.shape;
    const shape2 = element2.shape;
    expect(shape0.get('zIndex')).toEqual(1);
    expect(shape2.get('zIndex')).toEqual(2);

    const parent = shape0.getParent();
    expect(parent.getChildren()[1].get('origin').data.a).toEqual(data[1].a);
    expect(parent.getChildren()[2].get('origin').data.a).toEqual(data[2].a);
    element1.setState('selected', true);
    // toFront
    expect(parent.getChildren()[2].get('origin').data.a).toEqual(data[1].a);
    element1.setState('selected', false);
    // 回到一开始的位置
    expect(parent.getChildren()[1].get('origin').data.a).toEqual(data[1].a);

    interval.destroy();
  });
});
