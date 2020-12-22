import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#2474', () => {
  const data = [
    { x: 'a', y: 1, z: 'z1' },
    { x: 'b', y: 2, z: 'z1' },
    { x: 'c', y: 3, z: 'z1' },
    { x: 'a', y: 4, z: 'z2' },
    { x: 'b', y: 5, z: 'z2' },
    { x: 'c', y: 6, z: 'z2' },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 600,
    height: 500,
  });

  chart.data(data);

  it('line chart, set legend marker to cross symbol', () => {
    chart.line().position('x*y').color('z');
    chart.legend({ marker: { symbol: 'cross' } });

    chart.render();
    // legend 描边色不为 null
    const legends = chart.getController('legend').getComponents();
    expect(legends[0].component.get('items')[0].marker.style.stroke).toBeDefined();
  });

  it('interval chart, set legend marker to 线条形 symbol', () => {
    function setLegendMarkerSymbol(symbol: any) {
      chart.clear();
      chart.interval().position('x*y').color('z');
      chart.legend({ marker: { symbol } });
      chart.render();
      const legends = chart.getController('legend').getComponents();
      // marker 没有描边色，但是 items 有
      expect(legends[0].component.get('marker').style.stroke).not.toBeDefined();
      expect(legends[0].component.get('items')[0].marker.style.stroke).toBeDefined();
      expect(legends[0].component.get('items')[0].marker.style.fill).toBe(null);
    }

    setLegendMarkerSymbol('line');
    setLegendMarkerSymbol('cross');
    setLegendMarkerSymbol('hyphen');
    setLegendMarkerSymbol('plus');
    setLegendMarkerSymbol('tick');
  });
});
