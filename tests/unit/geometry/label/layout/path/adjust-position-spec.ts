import { each, findIndex } from '@antv/util';
import { Chart } from '../../../../../../src';
import { IGroup } from '../../../../../../src/dependents';
import { removeDom } from '../../../../../../src/util/dom';
import { cityTemperature } from '../../../../../data/city-temperature';
import { createDiv } from '../../../../../util/dom';

const hiddens = [
  {
    month: 'Jan',
    city: 'Tokyo',
  },
  {
    month: 'Feb',
    city: 'Tokyo',
  },
  {
    month: 'Mar',
    city: 'Tokyo',
  },
  {
    month: 'Apr',
    city: 'Tokyo',
  },
];

describe('adjust-position layout', () => {
  const container = createDiv();

  it('adjust position on line', async () => {
    const chart = new Chart({
      container,
      width: 600,
      height: 360,
    });
    chart.data(cityTemperature);
    chart.scale('temperature', {
      nice: true,
    });
    const line = chart
      .line()
      .position('month*temperature')
      .color('city')
      .label('temperature', {
        layout: [
          {
            type: 'path-adjust-position',
          },
        ],
      });

    chart.tooltip({
      shared: true,
    });
    chart.legend({
      position: 'top-left',
    });

    chart.render();

    const labels = line.labelsContainer.getChildren();

    each(labels, (label: IGroup) => {
      const data = label.get('data');
      const isHidden = findIndex(hiddens, (item) => item.city === data.city && item.month === data.month) >= 0;
      const text = label.getChildren()[0];
      expect(text.get('visible')).toBe(!isHidden);
    });
  });

  afterAll(() => {
    removeDom(container);
  });
});
