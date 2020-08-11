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
      return `<div class="g2-tooltip"><h5 class="custom">${title}</h5><div>${items[0]?.value}</div></div>`;
    },
  });
  chart.render();

  it('default, tooltip is render', () => {
    const point = chart.getXY({ year: '1994', value: 5 });
    chart.showTooltip(point);
    const tooltipController = chart.getController('tooltip');
    // @ts-ignore
    expect(tooltipController.title).toBe('1994');
    expect(document.getElementsByClassName('custom')[0].innerHTML).toBe('1994');
  });
});
