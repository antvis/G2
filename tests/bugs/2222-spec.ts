import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2222', () => {
  const div = createDiv();
  div.style.height = '400px';

  const data = [
    { year: '1991', v1: 3, v2: 6 },
    { year: '1992', v1: 4, v2: 8 },
  ];
  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 200,
  });

  const v1 = chart.createView();
  v1.data(data);
  v1.point().position('year*v1');
  
  const v2 = chart.createView();
  v2.data(data);
  v2.line().position('year*v2');

  chart.scale({
    v1: { sync: 'value' },
    v2: { sync: 'value' },
  });

  chart.render();

  it('scale pool should be clear when remove view', () => {
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(4);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(2);

    // 重新渲染
    chart.render();
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(4);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(2);

    // 删除
    chart.removeView(v1);
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(2);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(1);

    const v3 = chart.createView();
    v3.data(data);
    v3.point().position('year*v1');

    chart.render();
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(4);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(2);
  });

  it('scale pool should be clear when clear', () => {
    chart.clear();

    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(0);
    // @ts-ignore
    expect(chart.scalePool.syncScales.get('value').length).toBe(0);
  });

  it('scalePool.clear', () => {
    // @ts-ignore
    chart.scalePool.clear();
    // @ts-ignore
    expect(chart.scalePool.scales.size).toBe(0);
    // @ts-ignore
    expect(chart.scalePool.syncScales.size).toBe(0);
  });
});
