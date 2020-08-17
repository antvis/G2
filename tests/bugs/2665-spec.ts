import { Chart } from '../../src';
import { createDiv } from '../util/dom';

function getPathCount(path) {
  let count = 0;
  path.forEach((pathCommand) => {
    if (pathCommand[0] === 'M') {
      count++;
    }
  });

  return count;
}

describe('#2665', () => {
  it('2665', () => {
    const data = [{ year: '1991', value: 3 }];
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
      padding: 'auto',
    });
    chart.animate(false);
    chart.scale('value', {
      min: 0,
    });

    chart.data(data);
    let area = chart
      .area({
        showSinglePoint: true,
      })
      .position('year*value');
    let line = chart
      .line({
        showSinglePoint: true,
      })
      .position('year*value');
    chart.render();

    const areaShapeBBox = area.elements[0].getBBox();
    const lineShapeBBox = line.elements[0].getBBox();

    expect(areaShapeBBox.width).toBe(1);
    expect(areaShapeBBox.height).toBe(474);

    expect(lineShapeBBox.width).toBe(12);
    expect(lineShapeBBox.height).toBe(14);

    chart.changeData([
      { year: '1991', value: 3 },
      { year: '1992', value: null },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: null },
      { year: '1996', value: 6 },
      { year: '1997', value: 10 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]);

    expect(getPathCount(area.elements[0].shape.attr('path'))).toBe(3);
    expect(getPathCount(line.elements[0].shape.attr('path'))).toBe(3);

    // showSinglePoint: false
    chart.clear();
    chart.data([
      { year: '1991', value: 3 },
      { year: '1992', value: null },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: null },
      { year: '1996', value: 6 },
      { year: '1997', value: 10 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]);
    area = chart
      .area({
        showSinglePoint: false,
      })
      .position('year*value');
    line = chart
      .line({
        showSinglePoint: false,
      })
      .position('year*value');
    chart.render();
    expect(getPathCount(area.elements[0].shape.attr('path'))).toBe(2);
    expect(getPathCount(line.elements[0].shape.attr('path'))).toBe(2);
  });
});
