import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

const data = [
  { city: '杭州', sale: 100, category: '电脑' },
  { city: '广州', sale: 30, category: '电脑' },
  { city: '上海', sale: 110, category: '电脑' },
  { city: '呼和浩特', sale: 40, category: '电脑' },
  { city: '上海', sale: 200, category: '鼠标' },
  { city: '呼和浩特', sale: 10, category: '鼠标' },
  { city: '杭州', sale: 40, category: '鼠标' },
  { city: '广州', sale: 90, category: '鼠标' },
];

const div = createDiv();

const chart = new Chart({
  container: div,
  width: 800,
  height: 600,
  padding: 0,
  renderer: 'svg',
  autoFit: false,
});

chart.data(data.slice(0, data.length - 2));

chart.scale('city', { type: 'cat' });
chart.axis('city', { type: 'category' });
chart.coordinate('rect');

describe('chart multi view', () => {
  // 左右平分
  const v1 = chart.createView({
    region: {
      start: { x: 0, y: 0 },
      end: { x: 0.5, y: 1 },
    },
    padding: 5,
  });
  const v2 = chart.createView({
    region: {
      start: { x: 0.5, y: 0 },
      end: { x: 1, y: 1 },
    },
    padding: 5,
  });

  // @ts-ignore
  v1.polygon()
    .position('city*category')
    .color('sale');
  // @ts-ignore
  v2.interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  chart.render();

  it('chart constructor', () => {
    expect(chart.views.length).toEqual(2);
    expect(chart.views[0].geometries.length).toEqual(1);
    expect(chart.views[1].geometries.length).toEqual(1);

    expect(v1.getOptions().data.length).toBe(6);
  });

  it('region', () => {
    chart.render();
    expect({
      x: chart.viewBBox.x,
      y: chart.viewBBox.y,
      width: chart.viewBBox.width,
      height: chart.viewBBox.height,
    }).toEqual({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    });

    expect({
      x: v1.viewBBox.x,
      y: v1.viewBBox.y,
      width: v1.viewBBox.width,
      height: v1.viewBBox.height,
    }).toEqual({
      x: 5,
      y: 5,
      width: 390,
      height: 590,
    });

    expect({
      x: v2.viewBBox.x,
      y: v2.viewBBox.y,
      width: v2.viewBBox.width,
      height: v2.viewBBox.height,
    }).toEqual({
      x: 405,
      y: 5,
      width: 390,
      height: 590,
    });
  });

  it('shared options', () => {
    expect(v1.getOptions().data).toBe(v2.getOptions().data);

    expect(v1.getOptions().scales).not.toBe(v2.getOptions().scales);
    expect(v1.getOptions().scales).toEqual(v2.getOptions().scales);

    expect(v1.getOptions().coordinate).not.toBe(v2.getOptions().coordinate);
    expect(v1.getOptions().coordinate).toEqual(v2.getOptions().coordinate);

    expect(v1.getOptions().axes).not.toBe(v2.getOptions().axes);
    expect(v1.getOptions().axes).toEqual(v2.getOptions().axes);

    expect(v1.getOptions().coordinate.type).toBe('rect');
  });

  it('changeData', () => {
    chart.changeData(data);

    expect(v1.getOptions().data).toBe(data);
    expect(v1.getOptions().data.length).toBe(8);
  });
});
