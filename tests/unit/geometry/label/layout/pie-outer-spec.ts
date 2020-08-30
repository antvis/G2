import { IGroup } from '@antv/g-base';
import { Chart } from '../../../../../src';
import { removeDom } from '../../../../../src/util/dom';
import { createDiv } from '../../../../util/dom';
import { CountryEconomy } from '../../../../data/country-economy';

describe('pie-outer-label layout', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div,
    width: 400,
    height: 400,
  });

  it('50+ 标签', () => {
    chart.data(CountryEconomy.map((d) => ({ country: d.Country, value: d.Population })));
    chart.coordinate({
      type: 'theta',
      cfg: {
        radius: 0.6,
      },
    });
    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('country')
      .label('country', {
        offset: 8,
        style: {
          fill: '#999',
        },
        layout: { type: '' },
      });

    chart.render();

    const coordinate = chart.getCoordinate();
    const center = coordinate.getCenter();

    let labels = chart.geometries[0].labelsContainer.getChildren().filter(label => label.get('visible'));;
    let leftLabels = labels.filter((label) => label.attr('x') < center.x);
    if (leftLabels.length) {
      const minY = Math.min(...leftLabels.map((label) => label.getBBox().minY));
      const maxY = Math.max(...leftLabels.map((label) => label.getBBox().maxY));
      const labelHeight = (leftLabels[0] as IGroup).getChildren()[0].getBBox().height;
      // 未设置标签布局算法，标签总高度(labels.length * labelHeight) > 标签容器的总高度，发生遮挡
      expect(maxY - minY).not.toBeGreaterThanOrEqual(leftLabels.length * labelHeight);
    }

    chart.clear();

    chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('country')
      .label('country', {
        offset: 8,
        offsetX: 0,
        offsetY: 0,
        style: {
          fill: '#999',
        },
        layout: { type: 'pie-outer' },
      });

    chart.render();

    labels = chart.geometries[0].labelsContainer.getChildren().filter(label => label.get('visible'));
    expect(labels.length).toBeLessThan(CountryEconomy.length);
    leftLabels = labels.filter((label) => label.attr('x') < center.x);
    if (leftLabels.length) {
      const minY = Math.min(...leftLabels.map((label) => label.getBBox().minY));
      const maxY = Math.max(...leftLabels.map((label) => label.getBBox().maxY));
      const labelHeight = (leftLabels[0] as IGroup).getChildren()[0].getBBox().height;
      // 设置标签布局算法，可见的标签总高度(labels.length * labelHeight) <= 标签容器的总高度
      expect(maxY - minY).toBeGreaterThanOrEqual(leftLabels.length * labelHeight);
    }
  });

  it('normal', () => {
    chart.data([
      { item: '事例一', count: 50 },
      { item: '事例二', count: 15 },
      { item: '事例三', count: 10 },
      { item: '事例四', count: 22 },
      { item: '事例五', count: 3 },
    ]);
    chart.clear();

    chart.coordinate({
      type: 'theta',
      cfg: {
        radius: 0.5,
      },
    });

    chart
      .interval()
      .adjust('stack')
      .position('count')
      .color('item')
      .label('item', {
        offset: 10,
        style: {
          fill: '#999',
        },
        layout: { type: 'pie-outer' },
      });

    chart.render();
    const labels = chart.geometries[0].labelsContainer.getChildren().filter(label => label.get('visible'));;
    expect(labels.length).toBe(5);

    const label1 = (labels[0] as IGroup).getChildren()[0];
    const coordinate = chart.getCoordinate();
    const center = coordinate.getCenter();
    const radius = coordinate.getRadius();
    expect(label1.getBBox().x).toEqual(center.x + radius + 10 /** offset */);
    expect(label1.getBBox().y + label1.getBBox().height / 2).toEqual(center.y);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
