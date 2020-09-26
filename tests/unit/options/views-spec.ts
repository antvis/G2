import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';
import DataFilter from '../../../src/interaction/action/data/filter';
import Context from '../../../src/interaction/context';

describe('Views option', () => {
  const container = createDiv();
  const chart = new Chart({
    autoFit: false,
    container,
    width: 400,
    height: 400,
    // @ts-ignore
    options: {
      views: [{
        id: 'bar-0',
        options: {
          data: [
            { x: 'A', y: 10 },
            { x: 'B', y: 15 },
            { x: 'C', y: 40 },
          ],
          geometries: [{
            type: 'interval',
            position: {
              fields: ['x', 'y'],
            },
          }],
        },
      }, {
        id: 'line-1',
        options: {
          data: [
            { x: 'A', y1: 10 },
            { x: 'B', y1: 15 },
            { x: 'C', y1: 40 },
          ],
          geometries: [{
            type: 'line',
            position: {
              fields: ['x', 'y1']
            },
            size: {
              values: [2],
            },
          }],
          axes: {
            y1: {
              position: 'right',
            }
          }
        }
      }],
    },
  });

  function getLegendItems() {
    return chart.foregroundGroup.findAll((el) => {
      return el.get('name') === 'legend-item';
    });
  }
  it('views renderer', () => {
    chart.render();

    expect(chart.views.length).toBe(2);
    expect(chart.views[0].id).toBe('bar-0');
    expect(chart.views[1].id).toBe('line-1');

  });

  it('views updateOptions', () => {
    chart.updateOptions({
      animate: false,
      views: [{
        options: {
          data: [
            { x: 'A', y: 10 },
            { x: 'B', y: 15 },
            { x: 'C', y: 40 },
          ],
          geometries: [{
            type: 'interval',
            position: {
              fields: ['x', 'y'],
            },
            color: {
              fields: ['x'],
            },
            label: {
              fields: ['y'],
              cfg: {
                layout: {
                  type: 'adjust-color',
                },
                position: 'middle',
              },
            }
          }],
        },
      }],
    });
    chart.render(true);

    expect(chart.views.length).toBe(1);
  });

  it('legend click, a bug test', () => {
    // 触发图例点击
    const context = new Context(chart);
    const action = new DataFilter(context);
    const items = getLegendItems();
    const legendItem = items[0];
    const item = legendItem.get('delegateObject').item;
    context.event = {
      target: legendItem,
    };
    item.unchecked = true;

    expect(() => {
      action.filter();
    }).not.toThrow();

    expect(chart.views[0].geometries[0].elements.length).toBe(2);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
