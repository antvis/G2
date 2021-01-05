import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { delay } from '../util/delay';

const data = [
  {
    country: '北美',
    date: 1965,
    value: 1390.5,
  },
  {
    country: '北美',
    date: 1966,
    value: 1469.5,
  },
  {
    country: '北美',
    date: 1967,
    value: 1521.7,
  },
  {
    country: '北美',
    date: 1968,
    value: 1615.9,
  },
  {
    country: '北美',
    date: 1969,
    value: 1703.7,
  },
  {
    country: '北美',
    date: 1970,
    value: 1767.8,
  },
  {
    country: '北美',
    date: 1971,
    value: 1806.2,
  },
  {
    country: '北美',
    date: 1972,
    value: 1903.5,
  },
  {
    country: '中南美',
    date: 1965,
    value: 109.2,
  },
  {
    country: '中南美',
    date: 1966,
    value: 115.7,
  },
  {
    country: '中南美',
    date: 1967,
    value: 120.5,
  },
  {
    country: '中南美',
    date: 1968,
    value: 128,
  },
  {
    country: '中南美',
    date: 1969,
    value: 134.4,
  },
  {
    country: '中南美',
    date: 1970,
    value: 142.2,
  },
  {
    country: '中南美',
    date: 1971,
    value: 157.5,
  },
  {
    country: '中南美',
    date: 1972,
    value: 169.5,
  },
  {
    country: '欧洲',
    date: 1965,
    value: 1058.1,
  },
  {
    country: '欧洲',
    date: 1966,
    value: 1089.7,
  },
  {
    country: '欧洲',
    date: 1967,
    value: 1121.7,
  },
  {
    country: '欧洲',
    date: 1968,
    value: 1196.6,
  },
  {
    country: '欧洲',
    date: 1969,
    value: 1285.5,
  },
  {
    country: '欧洲',
    date: 1970,
    value: 1369,
  },
  {
    country: '欧洲',
    date: 1971,
    value: 1406.2,
  },
  {
    country: '欧洲',
    date: 1972,
    value: 1472.7,
  },
];


describe('G2Plot #2165', () => {
  it('change data', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: true,
    });

    chart.data([]);

    chart
      .area()
      .position('date*value')
      .color('country')
      .adjust('stack');

    chart.render();

    chart.changeData(data);

    // 会创建 scale 并根据 groupedScale 进行数据分组
    expect(chart.geometries[0].attributes.position.scales[0].type).toBe('linear');
    expect(chart.geometries[0].attributes.position.scales[1].type).toBe('linear');

    expect(chart.geometries[0].elements.length).toBe(3);
    expect(chart.geometries[0].elements[0].getModel().data.length).toBe(8);

    chart.destroy();
  });
});
