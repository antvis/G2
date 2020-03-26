import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { COMPONENT_TYPE } from '../../src/constant';

describe('#2212', () => {
  const chart = new Chart({
    container: createDiv(),
    height: 360,
    autoFit: true,
  });
  
  const data = [
    { Dev_Time: '2020-03-23 01:01:01', Vel_X: 10 },
    { Dev_Time: '2020-03-23 01:02:02', Vel_X: 12 },
    { Dev_Time: '2020-03-23 01:03:03', Vel_X: 8 },
    { Dev_Time: '2020-03-23 01:04:04', Vel_X: 10 },
  ];

  chart.scale('Dev_Time', {
    type: 'cat',
  });
  
  chart.data(data);
  chart.interval().position('Dev_Time*Vel_X');

  it('slider no start end', () => {
    chart.option('slider', {
    });
  
    chart.render();
    const slider = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.OTHER)[0].component;

    expect(slider.get('start')).toBe(0);
    expect(slider.get('end')).toBe(1);
  });
});
