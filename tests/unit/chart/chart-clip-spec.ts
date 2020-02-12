import { Chart } from '../../../src/';
import { createDiv, removeDom } from '../../util/dom';

describe('limitInPlot', () => {
  const div = createDiv();
  let chart;

  test('chart, limitInPlot', () => {
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
    chart = new Chart({
      container: div,
      width: 400,
      height: 300,
      limitInPlot: true,
    });

    chart.data(data);
    chart.scale('value', {
      min: 0,
      nice: true,
    });
    chart.scale('year', {
      range: [-0.1, 1.1],
    });


    chart.line().position('year*value');
    chart.render();

    const middleGroup = chart.middleGroup;
    const coordinate = chart.getCoordinate();
    expect(middleGroup.get('clipShape')).toBeDefined();
    expect(middleGroup.get('clipShape').attr('width')).toBe(coordinate.getWidth());
    expect(middleGroup.get('clipShape').attr('height')).toBe(coordinate.getHeight());
  });

  it('view, limitInPlot', () => {
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
    chart = new Chart({
      container: div,
      width: 400,
      height: 300,
    });

    const lineView = chart.createView({
      limitInPlot: true,
    });
    lineView.data(data);
    lineView.scale('year', {
      range: [-0.1, 1.1],
    });
    lineView.line().position('year*value');

    const pointView = chart.createView();
    pointView.data(data);
    pointView.scale('year', {
      range: [-0.1, 1.1],
    });
    pointView.line().position('year*value');

    chart.render();

    const chartMiddleGroup = chart.middleGroup;
    const lineMiddleGroup = lineView.middleGroup;
    const pointMiddleGroup = pointView.middleGroup;

    expect(chartMiddleGroup.get('clipShape')).toBeUndefined();
    expect(lineMiddleGroup.get('clipShape')).toBeDefined();
    expect(pointMiddleGroup.get('clipShape')).toBeUndefined();
  });

  afterEach(() => {
    chart.destroy();
  });

  afterAll(() => {
    removeDom(div);
  });
});
