import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { COMPONENT_TYPE } from '../../src/constant';

describe('#2173', () => {
  const div = createDiv();
  div.style.height = '400px';

  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 200,
  });

  const data = [
    {time: '2020-03-01', views:'pv', view_value: 1900},
    {time: '2020-03-01', views:'uv', view_value: 1000},
    {time: '2020-03-01', products:'product1', sale_value: 56},
    {time: '2020-03-01', products:'product2', sale_value: 36},
    {time: '2020-03-02', views:'pv', view_value: 2100},
    {time: '2020-03-02', views:'uv', view_value: 800},
    {time: '2020-03-02', products:'product1', sale_value: 46},
    {time: '2020-03-02', products:'product2', sale_value: 46},
    {time: '2020-03-03', views:'pv', view_value: 2100},
    {time: '2020-03-03', views:'uv', view_value: 800},
    {time: '2020-03-03', products:'product1', sale_value: 46},
    {time: '2020-03-03', products:'product2', sale_value: 46},
    {time: '2020-03-04', views:'pv', view_value: 1900},
    {time: '2020-03-04', views:'uv', view_value: 1000},
    {time: '2020-03-04', products:'product1', sale_value: 56},
    {time: '2020-03-04', products:'product2', sale_value: 36}
  ];

  chart.data(data);
  chart.line().position('time*view_value').color('views');
  chart.line().position('time*sale_value').color('products');

  chart.render();

  it('legend should not be overlap', () => {
    const [ l1, l2 ] = chart.getComponents().filter(co => co.type === COMPONENT_TYPE.LEGEND);
    expect(Math.abs(l1.component.getBBox().y - l2.component.getBBox().y)).toBe(20);
  });
});
