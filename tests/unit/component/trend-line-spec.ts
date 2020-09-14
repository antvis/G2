// @ts-nocheck
import { Chart } from '../../../src/';
import { data } from '../../data/scatter';
import { createDiv } from '../../util/dom';

describe('Annotation trend line', () => {
  it('trendLine', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      padding: [40],
    });

    chart.data(data);
    chart.point().position('x*y').shape('circle').style({
      fillOpacity: 0.85,
    });
    chart.annotation().trendLine({
      lineType: 'quad',
      confidenceStyle: {
        fill: '#ccc',
      },
    });
    chart.render();
    const annotations = chart.annotation().getComponents('trendLine');
    expect(annotations).not.toBeUndefined();
    const { component } = annotations[0];
    const { options } = component;
    expect(component.data.confidenceData.length).not.toBe(0);
    const currentDataLength = component.data.confidenceData.length;
    expect(options.lineType).toBe('quad');
    expect(options.type).toBe('trendLine');
    expect(options.xField).toBe('x');
    expect(options.yField).toBe('y');
    expect(options.confidenceStyle.fill).toBe('#ccc');
    chart.changeData(data.slice(0, 10));
    const changedAnnotation = chart.annotation().getComponents('trendLine');
    const currentAnnotation = changedAnnotation[0].component;
    expect(currentAnnotation.options.data.length !== currentDataLength).toBeTruthy();
    chart.destroy();
    expect(chart.annotation().getComponents('trendLine').length).toBe(0);
  });
});
