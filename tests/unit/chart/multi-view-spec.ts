import { Canvas, Group } from '@antv/g';
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
});

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

  v1.data(data);
  // @ts-ignore
  v1.polygon()
    .position('city*category')
    .color('sale');
  v2.data(data);
  // @ts-ignore
  v2.interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  chart.render();

  it('region', () => {
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

  it('chart constructor', () => {
    expect(chart.views.length).toEqual(2);
    expect(chart.views[0].geometries.length).toEqual(1);
    expect(chart.views[1].geometries.length).toEqual(1);
  });
});
