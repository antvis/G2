import 'jest-extended';
import { COMPONENT_TYPE } from '../../src/constant';
import { Chart } from '../../src/index';
import { createDiv } from '../util/dom';

describe('axis change coordinate', () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500,
  });

  chart.data(data);

  chart.scale('value', {
    min: 0,
    nice: true,
  });
  chart.scale('year', {
    range: [0, 1],
  });

  chart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
  });

  chart.line().position('year*value');
  chart
    .point()
    .position('year*value')
    .size(4)
    .shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1,
    });

  chart.render();

  function getAxes() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
  }

  it('render', () => {
    const axes = getAxes();
    expect(axes.length).toBe(2);
    const [x, y] = axes;

    expect(x.component.get('type')).toBe('line');
  });

  it('change coordinate', () => {
    chart.coordinate('polar');
    chart.render(true);

    const axes = getAxes();
    expect(axes.length).toBe(2);
    const [x, y] = axes;

    expect(x.component.get('type')).toBe('circle');
  });
});
