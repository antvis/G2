import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { ComponentOption } from '../../src/chart/interface';
import { COMPONENT_TYPE } from '../../src/constant';

describe('#1823', () => {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 }
  ];
  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300
  });

  chart.data(data);
  chart.coordinate('theta');

  chart.interval({
    // visible: false
  }).position('year*sales');
  chart.render();

  it('when theta coordinate, do not create axis and grid', () => {
    function getComponents(type: COMPONENT_TYPE) {
      return chart.getComponents().filter((co: ComponentOption) => co.type === type);
    }

    expect(getComponents(COMPONENT_TYPE.GRID)).toEqual([]);
    expect(getComponents(COMPONENT_TYPE.AXIS)).toEqual([]);
  });
});
