import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2202', () => {
  it('point stack', () => {
    const data = [
      { country: 'Asia', year: '1750', value: 502 },
      { country: 'Asia', year: '1800', value: 635 },
      { country: 'Asia', year: '1850', value: 809 },
      { country: 'Asia', year: '1900', value: 5268 },
      { country: 'Asia', year: '1950', value: 4400 },
      { country: 'Asia', year: '1999', value: 3634 },
      { country: 'Asia', year: '2050', value: 947 },
      { country: 'Africa', year: '1750', value: 106 },
      { country: 'Africa', year: '1800', value: 107 },
      { country: 'Africa', year: '1850', value: 111 },
      { country: 'Africa', year: '1900', value: 1766 },
      { country: 'Africa', year: '1950', value: 221 },
      { country: 'Africa', year: '1999', value: 767 },
      { country: 'Africa', year: '2050', value: 133 },
      { country: 'Europe', year: '1750', value: 163 },
      { country: 'Europe', year: '1800', value: 203 },
      { country: 'Europe', year: '1850', value: 276 },
      { country: 'Europe', year: '1900', value: 628 },
      { country: 'Europe', year: '1950', value: 547 },
      { country: 'Europe', year: '1999', value: 729 },
      { country: 'Europe', year: '2050', value: 408 },
      { country: 'Oceania', year: '1750', value: 200 },
      { country: 'Oceania', year: '1800', value: 200 },
      { country: 'Oceania', year: '1850', value: 200 },
      { country: 'Oceania', year: '1900', value: 460 },
      { country: 'Oceania', year: '1950', value: 230 },
      { country: 'Oceania', year: '1999', value: 300 },
      { country: 'Oceania', year: '2050', value: 300 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);
    chart.animate(false);

    const point = chart
      .point()
      .adjust('stack')
      .position('year*value')
      .color('country');

    const imagePoint = chart
      .point()
      .adjust('stack')
      .position('year*value')
      .color('country')
      .size(30)
      .shape('country', (name) => {
        return ['image', 'https://zos.alipayobjects.com/rmsportal/JuBdciUyUAkewNAetxtS.png']; // 根据具体的字段指定 shape
      })

    chart.render();

    expect(point.elements.length).toBe(data.length);
    // @ts-ignore
    expect(point.elements[0].shape.isGroup()).toBe(false);
    // @ts-ignore
    expect(imagePoint.elements[0].shape.isGroup()).toBe(false);
  });
});
