import { Chart } from '../../../../src/index';
import ListActive from '../../../../src/interaction/action/component/list-active';
import ElementActive from '../../../../src/interaction/action/element/active';
import DataFilter from '../../../../src/interaction/action/data/filter';

import Context from '../../../../src/interaction/context';
import { createDiv } from '../../../util/dom';


describe('active test', () => {
  const chart = new Chart({
    container: createDiv(),
    width: 600,
    height: 400,
    autoFit: false,
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
    sync: true
  });
  chart.interaction('legend-filter');
  const view1 = chart.createView({
    region: {
      start: {x: 0, y: 0},
      end: {x: 1, y: 0.5},
    },
    padding: [20, 20, 40, 80]
  });
  view1.data(data);
  const interval = view1
    .interval()
    .position('year*value')
    .color('year')
    .state({
      active: {
        style: {
          stroke: 'red',
          lineWidth: 1
        }
      }
    });

  const view2 = chart.createView({
    region: {
      start: {x: 0, y: 0.5},
      end: {x: 1, y: 1},
    },
    padding: [20, 20, 40, 80]
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
        }
      },
      inactive: {
        style: {
          opacity: 0.4,
        }
      }
    });

  chart.render();
  
  const context = new Context(chart);
  const listActive = new ListActive(context);
  const elementActive = new ElementActive(context);
  const filterAction = new DataFilter(context);
  const legendItems = chart.foregroundGroup.findAll((el) => {
    return el.get('name') === 'legend-item';
  });
  it('active legend',() => {
    const first = legendItems[0];
    const item = first.get('delegateObject').item;

    context.event = {
      target: first,
    };
    listActive.active();
    expect(item.active).toBe(true);
    elementActive.active();
    expect(point.elements[0].hasState('active')).toBe(true);
    elementActive.reset();
    expect(point.elements[0].hasState('active')).toBe(false);
  });

  it('lgend filter', () => {
    const first = legendItems[0];
    const item = first.get('delegateObject').item;

    context.event = {
      target: first,
    };
    item.unchecked = true;
    filterAction.filter();
    expect(point.elements.length).toBe(data.length - 1);
    expect(interval.elements.length).toBe(data.length -1);
  });
  afterAll(() => {
    context.destroy();
    chart.destroy();
  });
  
});