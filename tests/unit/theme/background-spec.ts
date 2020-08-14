import { Chart } from '../../../src';
import { createDiv, removeDom } from '../../util/dom';

describe('Custom theme background', () => {
  const data = [
    { x: 'a', y: 1, z: 'z1' },
    { x: 'b', y: 2, z: 'z1' },
    { x: 'c', y: 3, z: 'z1' },
    { x: 'a', y: 4, z: 'z2' },
    { x: 'b', y: 5, z: 'z2' },
    { x: 'c', y: 6, z: 'z2' },
  ];

  it('Theme background', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
      theme: 'dark',
    });

    chart.data(data);
    chart.line().position('x*y').color('z');

    chart.render();

    expect(chart.getCanvas().get('el').style.background).toBe('rgb(20, 20, 20)');
  });

  it('modify backgroud with `theme` API', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 600,
      height: 500,
    });

    chart.data(data);
    chart.line().position('x*y').color('z');

    chart.render();
    expect(chart.getCanvas().get('el').style.background).not.toBe('rgb(20, 20, 20)');

    chart.theme('dark');
    chart.render();
    expect(chart.getCanvas().get('el').style.background).toBe('rgb(20, 20, 20)');

    chart.theme({
      background: 'red',
    });
    chart.render();
    expect(chart.getCanvas().get('el').style.background).toBe('red');
  });
});
