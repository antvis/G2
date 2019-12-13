import { Chart } from '../../../../src/index';
import { createInteraction } from '../../../../src/interaction/index';
import { createDiv } from '../../../util/dom';

describe('test tooltip action', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 400,
    autoFit: false,
  });

  chart.data([
    { year: '1991', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
    { year: '1994', value: 34 },
    { year: '1995', value: 20 },
    { year: '1996', value: 7 },
    { year: '1997', value: 23 },
    { year: '1998', value: 90 },
    { year: '1999', value: 3 },
  ]);
  chart.animate(false);
  chart.tooltip(false);
  chart.interval().position('year*value');
  chart.render();
  const interaction = createInteraction('tooltip', chart);
  interaction.init();
  const tooltipDom = dom.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
  it('show', () => {
    expect(tooltipDom.style.visibility).toBe('hidden');
    chart.emit('plot:mousemove', {
      x: 50,
      y: 330,
    });
    expect(tooltipDom.style.visibility).toBe('visible');
  });

  it('hide', () => {
    chart.emit('plot:mouseleave', {
      x: 138,
      y: 383,
    });
    expect(tooltipDom.style.visibility).toBe('hidden');
  });

  afterAll(() => {
    chart.destroy();
  });
});
