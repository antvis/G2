import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

describe('TooltipCustomContent', () => {
  const container = createDiv();
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

  it('default, tooltip is render', () => {
    const chart = new Chart({
      container,
      autoFit: false,
      width: 400,
      height: 300,
      padding: 50,
    });
    chart.data(data);
    chart.scale('value', {
      nice: true,
    });
    chart.line().position('year*value');
    chart.tooltip({
      shared: true,
      showCrosshairs: true,
      customContent: (title, items) => {
        return `<h5 class="custom">${title}</h5><div>${items[0]?.value}</div>`;
      },
    });
    chart.render();

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);
    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.title).toBe('1994');
    expect(document.getElementsByClassName('custom')[0].innerHTML).toBe('1994');
  });

  it('process tooltip, custom content is HTMLElement', () => {
    const chart = new Chart({
      container,
      autoFit: false,
      width: 400,
      height: 300,
      padding: 50,
    });
    chart.data(data);
    chart.scale('value', {
      nice: true,
    });
    chart.line().position('year*value');
    chart.tooltip({
      shared: true,
      showCrosshairs: true,
      customContent: (title, items) => {
        const div = document.createElement('div');
        div.className = 'g2-tooltip';
        div.id = 'g2-tooltip';
        div.innerHTML = `${title}`;
        return div
      },
    });
    chart.render();

    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);
    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.title).toBe('1994');
    expect(document.getElementById('g2-tooltip').innerHTML).toBe('1994');
  });
});
