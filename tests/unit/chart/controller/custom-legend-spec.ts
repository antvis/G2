import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Legend', () => {
  it('global custom legend', () => {
    const data = [
      { genre: 'Sports', sold: 275, buy: 120 },
      { genre: 'Strategy', sold: 115, buy: 320 },
      { genre: 'Action', sold: 120, buy: 130 },
      { genre: 'Shooter', sold: 3500, buy: 123},
      { genre: 'Other', sold: 150, buy: 67 }
    ];

    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 380,
      height: 300,
    });

    chart.data(data);
    chart.scale({
      sold: {
        sync: 'value'
      },
      buy: {
        sync: 'value'
      }
    });
    chart.legend({
      custom: true,
      position: 'top',
      marker: { symbol: 'circle', style: { r: 3 } },
      reversed: true,
      items: [
        { name: 'sold', value: 'sold', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } },
        { name: 'buy', value: 'buy', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      ],
    });
    chart.line().position('genre*sold').color('red');
    chart.line().position('genre*buy').color('blue');

    chart.render();

    const [legend] = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND);

    expect(legend.component.get('items')).toEqual([
      { id: 'buy', name: 'buy', value: 'buy', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      { id: 'sold', name: 'sold', value: 'sold', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } }
    ]);

    expect(legend.direction).toBe('top');

    // update
    chart.legend({
      custom: true,
      reversed: true,
      items: [
        { name: 'sold', value: 'sold', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } },
        { name: 'buy1', value: 'buy1', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      ],
    });

    chart.render(true);
    const newLegend = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND)[0];
    // 保持引用
    expect(newLegend.component).toBe(legend.component);

    expect(newLegend.component.get('items')).toEqual([
      { id: 'buy1', name: 'buy1', value: 'buy1', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      { id: 'sold', name: 'sold', value: 'sold', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } }
    ]);
  });

  it('custom field legend', () => {
    const data = [
      { genre: 'Sports', sold: 275, buy: 120 },
      { genre: 'Strategy', sold: 115, buy: 320 },
      { genre: 'Action', sold: 120, buy: 130 },
      { genre: 'Shooter', sold: 3500, buy: 123},
      { genre: 'Other', sold: 150, buy: 67 }
    ];

    const chart = new Chart({
      container: createDiv(),
      autoFit: false,
      width: 380,
      height: 300,
    });

    chart.data(data);
    chart.scale({
      sold: {
        sync: 'value'
      },
      buy: {
        sync: 'value'
      }
    });
    chart.interval().position('genre*sold').color('genre');

    chart.legend('genre', {
      custom: true,
      marker: { symbol: 'circle', style: { r: 3 } },
      reversed: true,
      items: [
        { name: 'Sports', value: 'Sports', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } },
        { name: 'Action', value: 'Action', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      ],
    });

    chart.render();

    const [legend] = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND);

    expect(legend.component.get('items')).toEqual([
      { id: 'Action', name: 'Action', value: 'Action', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      { id: 'Sports', name: 'Sports', value: 'Sports', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } }
    ]);

    expect(legend.direction).toBe('bottom');

    // update
    chart.legend('genre', {
      custom: true,
      items: [
        { id: 'Action', name: 'Action', value: 'Action', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
        { id: 'Sports', name: 'Sports', value: 'Sports', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } },
        { id: 'Other', name: 'Other', value: 'Other', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } }
      ],
    });

    chart.render(true);
    const newLegend = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND)[0];
    // 保持引用
    expect(newLegend.component).toBe(legend.component);

    expect(newLegend.component.get('items')).toEqual([
      { id: 'Action', name: 'Action', value: 'Action', marker: { symbol: 'square', spacing: 100, style: { fill: 'blue' } } },
      { id: 'Sports', name: 'Sports', value: 'Sports', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } },
      { id: 'Other', name: 'Other', value: 'Other', marker: { symbol: 'circle', spacing: 100, style: { fill: 'red' } } }
    ]);
  });
});
