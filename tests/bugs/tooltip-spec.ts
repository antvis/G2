import HEATMAP from '../../examples/data/heatmap.json';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('tooltip', () => {
  it('after legend visible filter', () => {
    const data = [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ];

    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.scale({
      month: {
        range: [0, 1],
      },
      temperature: {
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.axis('temperature', {
      label: {
        formatter: (val) => {
          return val + ' °C';
        },
      },
    });

    const line = chart
      .line()
      .position('month*temperature')
      .color('city')
      .shape('smooth');

    const point = chart
      .point()
      .position('month*temperature')
      .color('city')
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    chart.render();

    line.elements[0].hide();
    point.elements.forEach(pointElement => {
      if (pointElement.getData().city === 'Tokyo') {
        pointElement.hide();
      }
    });

    const position = chart.getXY({ month: 'Jan', city: 'London', temperature: 3.9 });
    const tooltipItems = chart.getTooltipItems(position);
    expect(tooltipItems.length).toBe(1);
  });

  it('heatmap tooltip', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 500,
      padding: [0, 30, 60, 30]
    });
    chart.data(HEATMAP);
    chart.tooltip({
      showTitle: false
    });
    chart.animate(false);
    chart.axis(false);
    chart.heatmap()
      .position('g*l')
      .color('tmp', '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2');
    chart.annotation().image({
      start: ['min', 'max'],
      end: ['max', 'min'],
      src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
    });
    chart.render();

    chart.showTooltip(chart.getXY({ g: 916, l: 99, tmp: 703 }));
    const tooltip = chart.ele.getElementsByClassName('g2-tooltip')[0];
    expect(tooltip).toBeDefined();
  });

  it('tooltip avoid', () => {
    const data = [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 250,
    });

    chart.data(data);
    chart.area().position('year*value');
    chart.render();

    const point = chart.getXY({ year: '1995', value: 17000 });
    chart.showTooltip(point);

    // @ts-ignore
    expect(chart.ele.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('none');

    chart.tooltip({
      enterable: true,
    });
    chart.hideTooltip();
    chart.showTooltip(chart.getXY({ year: '1992', value: 16100 }));
    // @ts-ignore
    expect(chart.ele.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('auto');

    chart.hideTooltip();
    chart.tooltip({
      enterable: false,
    });
    chart.lockTooltip();
    chart.showTooltip(point);
    // @ts-ignore
    expect(chart.ele.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('auto');

    chart.unlockTooltip();
    chart.showTooltip(chart.getXY({ year: '1992', value: 16100 }));
    // @ts-ignore
    expect(chart.ele.getElementsByClassName('g2-tooltip')[0].style['pointer-events']).toBe('none');
  });
});
