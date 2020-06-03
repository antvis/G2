import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#2537', () => {
  const data = [
    { item: '事例一', count: 0, percent: 0 },
    { item: '事例二', count: 0, percent: 0 },
    { item: '事例三', count: 0, percent: 0 },
    { item: '事例四', count: 0, percent: 0 },
    { item: '事例五', count: 0, percent: 0 },
  ];

  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500,
  });

  chart.coordinate('theta', {
    radius: 0.75,
  });

  chart.data(data);

  chart.scale('percent', {
    formatter: (val) => {
      val = val * 100 + '%';
      return val;
    },
  });

  chart.tooltip({
    showTitle: false,
    showMarkers: false,
  });

  const interval = chart.interval().adjust('stack').position('percent');

  interval.color('item');

  chart.interaction('element-active');
  chart.render();

  test('饼图element渲染', () => {
    const canvas = chart.getCanvas();
    const el = canvas.get('el');
    const elements = interval.elements;
    elements.forEach(ele => {
      expect(ele.shape.getBBox().width).not.toBe(0);
    })
  });
});
