import { Chart } from '../../../../src/index';
import { createInteraction } from '../../../../src/interaction/index';
import { createDiv } from '../../../util/dom';
import Context from '../../../../src/interaction/context';
import SiblingTooltip from '../../../../src/interaction/action/component/sibling-tooltp';

describe('test tooltip action', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 400,
    autoFit: false,
    defaultInteractions: [],
  });

  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.interval().position('year*value');
  chart.render();
  const interaction = createInteraction('tooltip', chart);
  interaction.init();
  it('show', () => {
    // expect(tooltipDom.style.visibility).toBe('hidden');
    chart.emit('plot:mousemove', {
      x: 50,
      y: 330,
    });
    const tooltipDom = dom.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
    expect(tooltipDom.style.visibility).toBe('visible');
  });

  it('hide', () => {
    chart.emit('plot:leave', {
      x: 138,
      y: 383,
    });
    const tooltipDom = dom.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
    expect(tooltipDom.style.visibility).toBe('hidden');
  });

  afterAll(() => {
    chart.destroy();
  });
});

describe('test sibling tooltip', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 400,
    autoFit: false,
    defaultInteractions: [],
  });

  const data = [
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ];

  chart.animate(false);
  chart.tooltip(false);
  chart.scale('year', {
    sync: true,
  });
  chart.interaction('legend-filter');
  const view1 = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0.5 },
    },
    padding: [20, 20, 40, 80],
  });
  view1.data(data);
  view1.tooltip(true);
  view1
    .interval()
    .position('year*value')
    .color('year')
    .state({
      active: {
        style: {
          stroke: 'red',
          lineWidth: 1,
        },
      },
    });

  const view2 = chart.createView({
    region: {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 1 },
    },
    padding: [20, 20, 40, 80],
  });
  view2.data(data);
  const point = view2
    .point()
    .position('year*value')
    .color('year')
    .state({
      active: {
        style: {
          fill: 'red',
        },
      },
      inactive: {
        style: {
          opacity: 0.4,
        },
      },
    });

  chart.render();
  const context = new Context(view2);
  const action = new SiblingTooltip(context);
  const elements = point.elements;
  const tooltipDoms = dom.getElementsByClassName('g2-tooltip');
  it('show', () => {
    const first = elements[0].shape;
    context.event = {
      x: first.attr('x'),
      y: first.attr('y') - 1,
      target: first,
    };
    action.show();
    const firstDom = tooltipDoms[0] as HTMLElement;
    expect(tooltipDoms.length).toBe(1);
    expect((tooltipDoms[0] as HTMLElement).style.visibility).toBe('visible');
  });

  it('hide', () => {
    context.event = {};
    action.hide();
    expect((tooltipDoms[0] as HTMLElement).style.visibility).toBe('hidden');
  });

  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
});
