import { Chart } from '../../../../src/index';
import DragAction from '../../../../src/interaction/action/view/drag';
import MoveAction from '../../../../src/interaction/action/view/move';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';

describe('test view actions', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
    autoFit: false,
  });
  const data = [
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
  ];
  chart.data(data);
  chart.animate(false);
  chart.tooltip(false);
  chart
    .interval()
    .position('year*value')
    .color('year');
  chart.render();
  const context = new Context(chart);

  it('test drag', () => {
    const dragAction = new DragAction(context);
    let startCalled = false;
    let dragCalled = false;
    let endCalled = false;
    context.event = {
      x: 100,
      y: 100,
    };
    chart.on('dragstart', () => {
      startCalled = true;
    });
    chart.on('drag', () => {
      dragCalled = true;
    });
    chart.on('dragend', () => {
      endCalled = true;
    });
    dragAction.end(); // 开始前触发 end
    expect(endCalled).toBe(false);
    dragAction.start();
    expect(startCalled).toBe(false);
    context.event = {
      x: 101,
      y: 101,
    };
    dragAction.drag();
    expect(startCalled).toBe(false);
    context.event = {
      x: 101,
      y: 106,
    };

    dragAction.drag();
    expect(startCalled).toBe(true);
    expect(dragCalled).toBe(false);

    context.event = {
      x: 101,
      y: 105,
    };
    dragAction.drag();
    expect(dragCalled).toBe(true);
    dragAction.end();
    expect(endCalled).toBe(true);

    startCalled = false;
    dragCalled = false;
    endCalled = false;
    dragAction.drag();
    expect(dragCalled).toBe(false);
    chart.off('dragstart');
    chart.off('dragend');
    chart.off('drag');
    dragAction.destroy();
  });

  it('test move', () => {
    const moveAction = new MoveAction(context);
    context.event = {
      x: 100,
      y: 100,
    };
    // 没开始前测试 drag, end, reset 方法
    moveAction.reset();
    moveAction.move();
    moveAction.end();

    moveAction.start();
    // @ts-ignore
    expect(moveAction.starting).toBe(true);
    // @ts-ignore
    expect(moveAction.isMoving).toBe(false);

    context.event = {
      x: 100,
      y: 101,
    };
    moveAction.move();
    // @ts-ignore
    expect(moveAction.isMoving).toBe(false);
    context.event = {
      x: 100,
      y: 106,
    };
    moveAction.move();
    // @ts-ignore
    expect(moveAction.isMoving).toBe(true);
    let matrix = chart.foregroundGroup.getMatrix();
    expect(matrix[6]).toBe(0);
    expect(matrix[7]).toBe(6);

    context.event = {
      x: 120,
      y: 156,
    };
    moveAction.move();
    matrix = chart.foregroundGroup.getMatrix();
    expect(matrix[6]).toBe(20);
    expect(matrix[7]).toBe(56);
    moveAction.end();
    // @ts-ignore
    expect(moveAction.isMoving).toBe(false);
    context.event = {
      x: 100,
      y: 100,
    };
    moveAction.start();
    context.event = {
      x: 110,
      y: 110,
    };
    moveAction.move();
    matrix = chart.foregroundGroup.getMatrix();
    expect(matrix[6]).toBe(30);
    expect(matrix[7]).toBe(66);
    moveAction.reset();
    matrix = chart.foregroundGroup.getMatrix();
    expect(matrix).toBe(null);
    moveAction.destroy();
  });
  afterAll(() => {
    chart.destroy();
  });
});
