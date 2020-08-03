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

    let labels = chart.geometries[0].labelsContainer.getChildren();
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
        style: {
          fill: '#999',
        },
        layout: { type: 'pie-outer' },
      });

    chart.render();

    labels = chart.geometries[0].labelsContainer.getChildren();
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

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
