import { Chart } from '../../../../src/index';
import { createInteraction } from '../../../../src/interaction/index';
import { createDiv } from '../../../util/dom';
import { COMPONENT_TYPE } from '../../../../src/constant';

describe('test component tooltip', () => {
  const dom = createDiv();
  const chart = new Chart({
    container: dom,
    width: 400,
    height: 300,
    defaultInteractions: [],
  });

  chart.data([
    { year: '我是一段很长很长很长很长很长的文本', value: 13 },
    { year: '1992', value: 34 },
    { year: '1993', value: 5 },
  ]);
  chart.animate(false);
  chart.interval().position('year*value').color('year');
  chart.axis('year', {
    label: {
      autoRotate: true,
      autoEllipsis: true,
      autoHide: true,
    },
  });
  chart.render();

  const interaction = createInteraction('ellipsis-text', chart);
  interaction.init();
  it('show', () => {
    const axis = chart
      .getComponents()
      .filter((co) => co.type === COMPONENT_TYPE.AXIS)
      .filter((co) => co.direction === 'bottom')[0];
    const axisTarget = axis.component.get('container').findById('-axis-label-我是一段很长很长很长很长很长的文本');
    chart.emit('axis-label:mousemove', {
      x: 50,
      y: 330,
      target: axisTarget,
    });
    const tooltipDom = dom.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
    expect(tooltipDom.style.visibility).toBe('visible');
    expect(tooltipDom.textContent).toBe(axisTarget.get('tip'));

    const legend = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND)[0];
    const legendTarget = legend.component
      .get('container')
      .findById('-legend-item-我是一段很长很长很长很长很长的文本-name');
    chart.emit('legend-item-name:mousemove', {
      x: 50,
      y: 330,
      target: legendTarget,
    });
    expect(tooltipDom.style.visibility).toBe('visible');
    expect(tooltipDom.textContent).toBe(legendTarget.get('tip'));
  });

  it('hide', () => {
    chart.emit('axis-label:mouseleave', {
      x: 138,
      y: 383,
    });
    const tooltipDom = dom.getElementsByClassName('g2-tooltip')[0] as HTMLElement;
    expect(tooltipDom.style.visibility).toBe('hidden');
  });

  afterAll(() => {
    // chart.destroy();
  });
});
