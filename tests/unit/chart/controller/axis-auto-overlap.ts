import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { removeDom } from '../../../../src/util/dom';
import { createDiv } from '../../../util/dom';

describe('axis auto overlap', () => {
  const container = createDiv();
  const data = [
    { year: '1991还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 3 },
    { year: '1992还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 4 },
    { year: '1993还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 3.5 },
    { year: '1994还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 5 },
    { year: '1995还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 4.9 },
    { year: '1996还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 6 },
    { year: '1997还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 7 },
    { year: '1998还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 9 },
    { year: '1999还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗还是不够长吗', value: 13 },
  ];
  const chart = new Chart({
    container,
    width: 500,
    height: 300,
  });

  chart.data(data);
  chart.animate(false);
  chart.axis('year', {
    position: 'bottom',
    label: {
      autoRotate: true,
      autoHide: false,
      autoEllipsis: true,
    },
  });
  chart.line().position('year*value').label('value');
  chart.render();

  function getAxes() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
  }

  it('axis', async () => {
    const xAxis = getAxes().filter((axis) => axis.direction === 'bottom')[0];
    const labelGroup = xAxis.component.get('group').findAllByName('axis-label-group')[0];
    const label = labelGroup.getChildren()[0];
    expect(label.attr('text')).toBe('1991还是不够长吗还是不够长吗…');
    expect(label.getCanvasBBox().height).toBeLessThan(150);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
