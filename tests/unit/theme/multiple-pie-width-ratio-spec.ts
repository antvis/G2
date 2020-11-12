import { Chart, registerTheme } from '../../../src/';
import { createDiv } from '../../util/dom';

describe('polar-stack with multiplePieWidthRatio', () => {
  it('multiplePieWidthRatio', () => {
    const data = [
      {year: "2000", type: "类型 A", count: 21},
      {year: "2000", type: "类型 B", count: 16},
      {year: "2001", type: "类型 A", count: 25},
      {year: "2001", type: "类型 B", count: 16},
      {year: "2002", type: "类型 A", count: 25},
      {year: "2002", type: "类型 B", count: 15},
      {year: "2003", type: "类型 A", count: 25},
      {year: "2003", type: "类型 B", count: 10},
    ];

    registerTheme('newTheme', {
      multiplePieWidthRatio:  0.5,
    });

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);

    chart.coordinate('polar', {
      innerRadius: 0.1,
      radius: 0.8
    }).transpose();
    
    chart
      .interval()
      .position('year*count')
      .color('type')
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .adjust('stack');

    chart.theme('newTheme');
    chart.render();

    // @ts-ignore
    expect(chart.geometries[0].defaultSize).toBe(0.125);

    chart.destroy();
  });
});
