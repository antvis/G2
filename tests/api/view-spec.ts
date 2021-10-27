/**
 * 测试 G2 提供的一些开放 API，用于增强自定义能力
 */
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

const data = [
  { company: 'Apple', type: '整体', value: 30 },
  { company: 'Facebook', type: '整体', value: 35 },
  { company: 'Google', type: '整体', value: 28 },
  { company: 'Apple', type: '非技术岗', value: 40 },
  { company: 'Facebook', type: '非技术岗', value: 65 },
  { company: 'Google', type: '非技术岗', value: 47 },
  { company: 'Apple', type: '技术岗', value: 23 },
  { company: 'Facebook', type: '技术岗', value: 18 },
  { company: 'Google', type: '技术岗', value: 20 },
];

const chart = new Chart({
  container: createDiv(),
  width: 600,
  height: 400,
});

chart.data(data);

chart.legend({
  position: 'top',
});

chart
  .interval()
  .position('type*value')
  .color('company')
  .adjust([
    {
      type: 'dodge',
      marginRatio: 0,
    },
  ]);

chart.render();

describe('G2 api', () => {
  it('chart data', () => {
    expect(chart.getOriginalData()).toBe(data);
    expect(chart.getData()).toBe(data);

    chart.filter('company', (company) => {
      return company !== 'Google';
    });

    chart.render();

    expect(chart.getOriginalData()).toBe(data);
    expect(chart.getData()).toEqual(data.filter((datum) => datum.company !== 'Google'));
  });

  it('chart layout', () => {
    chart.padding = 32;
    chart.render();

    expect(chart.getPadding()).toEqual([32, 32, 32, 32]);
    expect([chart.getCoordinate().getWidth(), chart.getCoordinate().getHeight()]).toEqual([536, 336]);
  });

  it('chart scale', () => {
    expect(chart.getXScale().field).toBe('type');
    expect(chart.getYScales().length).toBe(1);
    expect(chart.getYScales()[0].field).toBe('value');

    expect(chart.getScale('type')).toBe(chart.getXScale());
    expect(chart.getScale('value')).toBe(chart.getYScales()[0]);
    expect(chart.getScale('company').field).toBe('company');
  });

  it('chart coordinate', () => {
    expect(chart.getCoordinate().x.start).toBe(32);
    expect(chart.getCoordinate().y.end).toBe(32);
    expect(chart.getCoordinate().convert({ x: 0.5, y: 0.5 })).toEqual({ x: 300, y: 200 });
  });

  it('chart elements', () => {
    expect(chart.getGeometries().length).toBe(1);

    expect(chart.getElements().length).toBe(6);

    expect(chart.getElementsBy((element) => element.getData().value > 40).length).toBe(1); // 因为还有一个隐藏了
  });

  /**
   * 筛选（filter），联动（state），下钻（changeData）
   */
  it('chart analysis', () => {
    // 去掉筛选
    chart.filter('company', null);
    chart.render();

    expect(chart.getData()).toEqual(data);
    expect(chart.getOriginalData()).toEqual(data);

    // 联动（有点复杂，怎么提供语法躺
    const ele = chart.getElementsBy((element) => element.getData().value > 40);

    ele.forEach((el) => {
      el.setState('active', true);
    });

    // 下钻（其实就是修改 G2 实例，重新渲染了
    const drilldownData = [
      { company: 'Apple', type: '整体', subtype: 'A', value: 30 },
      { company: 'Apple', type: '整体', subtype: 'B', value: 40 },
      { company: 'Apple', type: '整体', subtype: 'C', value: 23 },
    ];
    chart.clear();

    chart.data(drilldownData);
    chart.interval().position('subtype*value');

    chart.render();

    expect(chart.getGeometries().length).toBe(1);
    expect(chart.getElements().length).toBe(3);

    // 用完销毁
    chart.destroy();
  });
});
