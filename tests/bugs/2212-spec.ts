import { Chart } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv } from '../util/dom';

describe('#2212', () => {
  const chart = new Chart({
    container: createDiv(),
    height: 360,
    autoFit: true,
  });

  const data = [
    { time: '2020-03-23 01:01:01', value: 10 },
    { time: '2020-03-23 01:02:02', value: 12 },
    { time: '2020-03-23 01:03:03', value: 8 },
    { time: '2020-03-23 01:04:04', value: 10 },
  ];

  chart.scale('time', {
    type: 'cat',
  });

  chart.data(data);
  chart.interval().position('time*value');

  it('slider no start end', () => {
    chart.option('slider', {
    });

    chart.render();
    const slider = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.OTHER)[0].component;

    expect(slider.get('start')).toBe(0);
    expect(slider.get('end')).toBe(1);
  });
});
