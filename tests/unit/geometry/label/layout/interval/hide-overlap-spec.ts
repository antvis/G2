import { each, findIndex } from '@antv/util';
import { Chart } from '../../../../../../src';
import { IGroup } from '../../../../../../src/dependents';
import { removeDom } from '../../../../../../src/util/dom';
import { subSalesByArea } from '../../../../../data/sales';
import { createDiv } from '../../../../../util/dom';

const hiddens = [
  {
    area: '东北',
    series: '小型企业',
  },
  {
    area: '华东',
    series: '公司',
  },
  {
    area: '西北',
    series: '小型企业',
  },
  {
    area: '西南',
    series: '小型企业',
  },
];

describe('hide-overlap layout', () => {
  const container = createDiv();

  it('hide-overlap on dodged interval /w inShape', () => {
    const chart = new Chart({
      container,
      width: 400,
      height: 300,
    });
    chart.data(subSalesByArea);
    chart.scale('sales', {
      nice: true,
      formatter: (v) => `${Math.floor(v / 10000)}万`,
    });
    const interval = chart
      .interval()
      .animate(false)
      .position('area*sales')
      .adjust('dodge')
      .color('series')
      .label('sales', {
        position: 'middle',
        style: {
          fill: 'red',
        },
        layout: [
          {
            type: 'interval-hide-overlap',
          },
        ],
      });

    chart.render();

    const labels = interval.labelsContainer.getChildren();

    each(labels, (label: IGroup) => {
      const data = label.get('data');
      const isHidden = findIndex(hiddens, (item) => item.area === data.area && item.series === data.series) >= 0;
      expect(label.get('visible')).toBe(!isHidden);
    });
  });

  afterAll(() => {
    removeDom(container);
  });
});
