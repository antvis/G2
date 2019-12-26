import { Chart } from '../../src';
import { ComponentOption } from '../../src/chart/interface';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv } from '../util/dom';

describe('#1823', () => {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
  });

  chart.data(data);
  chart.coordinate('theta');

  chart
    .interval({
      // visible: false
    })
    .position('year*sales');
  chart.render();

  function getComponents(type: COMPONENT_TYPE) {
    return chart.getComponents().filter((co: ComponentOption) => co.type === type);
  }

  it('when theta coordinate, do not create axis and grid', () => {
    expect(getComponents(COMPONENT_TYPE.GRID)).toEqual([]);
    expect(getComponents(COMPONENT_TYPE.AXIS)).toEqual([]);
  });

  it('when polar coordinate, create axis and grid when correct theme', () => {
    chart.coordinate('polar');
    chart.render();

    const [grid] = getComponents(COMPONENT_TYPE.GRID);

    // grid 读到正确的主题颜色
    expect(grid.component.get('line').style.stroke).toBe('#E9E9E9');
    expect(grid.component.get('line').style.lineWidth).toBe(1);
  });
});
