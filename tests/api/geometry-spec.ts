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
  autoFit: false,
  padding: 32,
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
  it('geometry coordinate/size', () => {
    expect(chart.getGeometries()[0].getCoordinate().getWidth()).toBe(536);
    expect(chart.getGeometries()[0].getCoordinate().getHeight()).toBe(336);
  });

  it('geometry data', () => {
    expect(chart.getGeometries()[0].getData()).toEqual(data);

    expect(chart.getGeometries()[0].getXYFields()).toEqual(['type', 'value']);
    expect(chart.getGeometries()[0].getXField()).toEqual('type');
    expect(chart.getGeometries()[0].getYField()).toEqual('value');
    expect(chart.getGeometries()[0].getGroupFields()).toEqual(['company']);
    expect(chart.getGeometries()[0].getFields()).toEqual(['type', 'value', 'company']);
  });

  it('geometry element', () => {
    expect(chart.getGeometries()[0].getElements().length).toBe(9);
    expect(chart.getGeometries()[0].getElementsBy((el) => el.getData().value > 40).length).toBe(2);
  });

  it('geometry adjust', () => {
    expect(chart.getGeometries()[0].getAdjust('stack')).toBeUndefined();
    expect(chart.getGeometries()[0].getAdjust('dodge')).toBeDefined();
  });

  it('geometry attribute', () => {
    expect(chart.getGeometries()[0].getAttribute('position')).toBeDefined();
    expect(chart.getGeometries()[0].getAttribute('color')).toBeDefined();

    expect(chart.getGeometries()[0].getAttribute('size')).toBeUndefined();

    const color = chart.getGeometries()[0].getAttribute('color');
    expect(
      chart.getGeometries()[0].getAttributeValues(color, {
        company: 'Google',
      })
    ).toEqual(['#5D7092']);
  });

  it('coordinate', () => {
    expect(chart.getGeometries()[0].getCoordinate()).toBeDefined();
  });

  afterAll(() => {
    chart.destroy();
  });
});
