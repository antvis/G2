import { Chart } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv } from '../util/dom';

describe('1744', () => {
  const data = [
    { question: '问题 1', percent: 0.21 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ];

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 400,
  });
  chart.legend(false);
  chart.axis(false);
  chart.animate(false);
  chart.data(data);
  chart.scale('question', {
    range: [0, 1]
  });
  chart.coordinate('polar').transpose();

  chart
    .interval()
    .position('question*percent')
    .color('percent', '#BAE7FF-#1890FF-#0050B3');
  chart.render();

  it('Not render by default', () => {
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(0);
  });

  it('After update, not render by default', () => {
    chart.render(true);
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(0);

    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    expect(grids.length).toBe(0);
  });

  it('if update and axes are opened. should be render', () => {
    chart.axis(true);
    chart.render(true);
    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    expect(axes.length).toBe(2);

    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    expect(grids.length).toBe(2);
  });

  it('But can be opened by chart.axis()', () => {
    chart.clear();
    chart.data(data);

    chart.axis('percent', true);
    chart.axis('question', {
      grid: {
        closed: false,
      },
    });

    chart.coordinate('polar', {
      innerRadius: 0.4,
      endAngle: Math.PI / 2
    }).transpose();

    chart
      .interval()
      .position('question*percent')
      .color('percent', '#BAE7FF-#1890FF-#0050B3');
    chart.render();

    expect(chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS).length).toBe(2);
    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    expect(grids.length).toBe(2);
    expect(grids[0].component.get('items').length).toBe(8);
    expect(grids[0].component.getBBox().width).toBeCloseTo(183.5000005594601);
    expect(grids[0].component.getBBox().height).toBeCloseTo(366.5);
  });

  it('update', () => {
    chart.changeSize(800, 800);

    expect(chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS).length).toBe(2);
    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    expect(grids.length).toBe(2);
    expect(grids[0].component.get('items').length).toBe(8);
    expect(grids[0].component.getBBox().width).toBeCloseTo(383.5);
    expect(grids[0].component.getBBox().height).toBeCloseTo(766.5);
  });
});
