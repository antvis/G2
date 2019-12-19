import { DataView } from '@antv/data-set';
import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

describe('Test charts animate', () => {
  it('Column Chart', () => {
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data([
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ]);
    chart.scale('sales', {
      max: 200,
      nice: false,
    });
    chart
      .interval()
      .position('year*sales')
      .label('sales');
    chart.render();

    setTimeout(() => {
      chart.changeData([
        { year: '1951 年', sales: 138 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 11 },
        { year: '1957 年', sales: 45 },
        { year: '1970 年', sales: 145 },
      ]);
    }, 1000);
  });

  it('Rose Chart', () => {
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data([
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ]);

    chart.coordinate('polar');
    chart
      .interval()
      .position('year*sales')
      .label('sales', {
        offset: -20,
        // labelEmit: true,
        adjustType: 'treemap',
      });
    chart.render();

    setTimeout(() => {
      chart.changeData([
        { year: '1951 年', sales: 138 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 11 },
        { year: '1957 年', sales: 45 },
        { year: '1970 年', sales: 145 },
      ]);
    }, 1000);
  });

  it('Bar Chart', () => {
    const data = [
      { country: '巴西', population: 18203 },
      { country: '印尼', population: 23489 },
      { country: '美国', population: 29034 },
      { country: '印度', population: 104970 },
      { country: '中国', population: 131744 },
    ];

    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(data);

    chart.coordinate().transpose();
    // chart.coordinate('polar').transpose();
    chart.interval().position('country*population');

    chart.render();
  });

  it('Stack Column Chart', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
      { name: 'London', 月份: 'May', 月均降雨量: 47 },
      { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
      { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
      { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
      { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
      { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
      { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
      { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    ];

    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(data);

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('stack');

    chart.render();

    setTimeout(() => {
      chart.changeData([
        { name: 'London', 月份: 'Jan.', 月均降雨量: 48.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 2.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 20.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
      ]);
    }, 3000);
  });

  it('Pie Chart', () => {
    const data = [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ];
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });
    chart.tooltip({
      showTitle: false,
      showTooltipMarkers: false,
    });
    chart.axis(false); // 关闭坐标轴
    chart
      .interval()
      .position('1*percent')
      .color('item')
      .label('percent', {
        content: (d) => {
          return `${d.item}: ${d.percent * 100}%`;
        },
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      })
      .adjust('stack');
    chart.render();

    setTimeout(() => {
      chart.changeData([
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.57 },
        { item: '事例四', count: 13, percent: 0.22 },
      ]);
    }, 1000);
  });

  it('Line Chart', () => {
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
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(data);
    chart.scale('value', {
      min: 0,
    });
    chart.scale('year', {
      range: [0, 1],
    });

    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });

    chart.line().position('year*value');
    chart
      .point()
      .position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    chart.render();

    setTimeout(() => {
      chart.changeData([
        { year: '1991', value: 30 },
        { year: '1992', value: 14 },
        { year: '1993', value: 35 },
        { year: '1994', value: 50 },
        { year: '1995', value: 49 },
        { year: '1996', value: 62 },
        { year: '1997', value: 17 },
        { year: '1998', value: 39 },
        { year: '1999', value: 3 },
      ]);
    }, 3000);
  });

  it('Stack Area Chart', () => {
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
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(data);
    chart.scale({
      year: {
        type: 'linear',
        tickInterval: 50,
      },
    });

    chart
      .area()
      .adjust('stack')
      .position('year*value')
      .color('country');
    chart
      .line()
      .adjust('stack')
      .position('year*value')
      .color('country')
      .size(2);

    chart.render();

    setTimeout(() => {
      chart.changeData([
        { country: 'Asia', year: '1750', value: 52 },
        { country: 'Asia', year: '1800', value: 65 },
        { country: 'Asia', year: '1850', value: 89 },
        { country: 'Asia', year: '1900', value: 526 },
        { country: 'Asia', year: '1950', value: 400 },
        { country: 'Asia', year: '1999', value: 364 },
        { country: 'Asia', year: '2050', value: 947 },
        { country: 'Europe', year: '1750', value: 63 },
        { country: 'Europe', year: '1800', value: 203 },
        { country: 'Europe', year: '1850', value: 26 },
        { country: 'Europe', year: '1900', value: 28 },
        { country: 'Europe', year: '1950', value: 547 },
        { country: 'Europe', year: '1999', value: 29 },
        { country: 'Europe', year: '2050', value: 408 },
      ]);
    }, 1000);
  });

  it('Radar Chart', () => {
    const data = [
      { item: 'Design', user: 'a', score: 70 },
      { item: 'Design', user: 'b', score: 30 },
      { item: 'Development', user: 'a', score: 60 },
      { item: 'Development', user: 'b', score: 70 },
      { item: 'Marketing', user: 'a', score: 50 },
      { item: 'Marketing', user: 'b', score: 60 },
      { item: 'Users', user: 'a', score: 40 },
      { item: 'Users', user: 'b', score: 50 },
      { item: 'Test', user: 'a', score: 60 },
      { item: 'Test', user: 'b', score: 70 },
      { item: 'Language', user: 'a', score: 70 },
      { item: 'Language', user: 'b', score: 50 },
      { item: 'Technology', user: 'a', score: 50 },
      { item: 'Technology', user: 'b', score: 40 },
      { item: 'Support', user: 'a', score: 30 },
      { item: 'Support', user: 'b', score: 40 },
      { item: 'Sales', user: 'a', score: 60 },
      { item: 'Sales', user: 'b', score: 40 },
      { item: 'UX', user: 'a', score: 50 },
      { item: 'UX', user: 'b', score: 60 },
    ];
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(data);
    chart.scale('score', {
      min: 0,
      max: 80,
    });
    chart.coordinate('polar', {
      radius: 0.8,
    });
    chart.tooltip({
      shared: true,
    });
    chart.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    });
    chart.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    });

    chart
      .line()
      .position('item*score')
      .color('user')
      .size(2);
    chart
      .point()
      .position('item*score')
      .color('user')
      .shape('circle')
      .size(4)
      .style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1,
      });
    chart
      .area()
      .position('item*score')
      .color('user');
    chart.render();

    setTimeout(() => {
      chart.changeData([
        { item: 'Design', user: 'b', score: 40 },
        { item: 'Development', user: 'b', score: 70 },
        { item: 'Marketing', user: 'b', score: 60 },
        { item: 'Users', user: 'b', score: 50 },
        { item: 'Test', user: 'b', score: 70 },
        { item: 'Language', user: 'b', score: 50 },
        { item: 'Technology', user: 'b', score: 40 },
        { item: 'Support', user: 'b', score: 40 },
        { item: 'Sales', user: 'b', score: 40 },
        { item: 'UX', user: 'b', score: 60 },
      ]);
    }, 1000);
  });

  it('Polygon', () => {
    const data = [
      [0, 0, 10],
      [0, 1, 19],
      [0, 2, 8],
      [0, 3, 24],
      [0, 4, 67],
      [1, 0, 92],
      [1, 1, 58],
      [1, 2, 78],
      [1, 3, 117],
      [1, 4, 48],
      [2, 0, 35],
      [2, 1, 15],
      [2, 2, 123],
      [2, 3, 64],
      [2, 4, 52],
      [3, 0, 72],
      [3, 1, 132],
      [3, 2, 114],
      [3, 3, 19],
      [3, 4, 16],
      [4, 0, 38],
      [4, 1, 5],
      [4, 2, 8],
      [4, 3, 117],
      [4, 4, 115],
      [5, 0, 88],
      [5, 1, 32],
      [5, 2, 12],
      [5, 3, 6],
      [5, 4, 120],
      [6, 0, 13],
      [6, 1, 44],
      [6, 2, 88],
      [6, 3, 98],
      [6, 4, 96],
      [7, 0, 31],
      [7, 1, 1],
      [7, 2, 82],
      [7, 3, 32],
      [7, 4, 30],
      [8, 0, 85],
      [8, 1, 97],
      [8, 2, 123],
      [8, 3, 64],
      [8, 4, 84],
      [9, 0, 47],
      [9, 1, 114],
      [9, 2, 31],
      [9, 3, 48],
      [9, 4, 91],
    ];
    const source = [];
    for (const item of data) {
      source.push({
        name: item[0],
        day: item[1],
        sales: item[2],
      });
    }
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });

    chart.data(source);

    chart.scale('name', {
      type: 'cat',
      values: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'],
    });
    chart.scale('day', {
      type: 'cat',
      values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    });

    chart.axis('name', {
      tickLine: null,
      grid: {
        align: 'center',
        lineStyle: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
      },
    });

    chart.axis('day', {
      title: null,
      grid: {
        align: 'center',
        lineStyle: {
          lineWidth: 1,
          lineDash: null,
          stroke: '#f0f0f0',
        },
        showFirstLine: true,
      },
    });

    chart.coordinate('polar');
    chart
      .polygon()
      .position('name*day')
      .color('sales', '#BAE7FF-#1890FF-#0050B3')
      .label('sales', {
        offset: -2,
        style: {
          fill: '#fff',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      })
      .style({
        lineWidth: 1,
        stroke: '#fff',
      });

    chart.render();

    // setTimeout(() => {
    //   const newData = [
    //     [0, 0, 102],
    //     [0, 1, 139],
    //     [0, 2, 83],
    //     [0, 3, 34],
    //     [0, 4, 67],
    //   ];
    //   const newSource = [];
    //   for (const item of newData) {
    //     newSource.push({
    //       name: item[0],
    //       day: item[1],
    //       sales: item[2],
    //     });
    //   }
    //   chart.scale('name', {
    //     type: 'cat',
    //     values: ['Alexander'],
    //   });
    //   chart.changeData(newSource);
    // }, 2000);
  });

  it('Schema', () => {
    const data = [
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
      { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
      { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
      { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
      { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30 },
      { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
      { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 },
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'map',
      callback: (obj) => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      },
    });
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
      localRefresh: false,
    });
    chart.data(dv.rows);
    chart.scale('range', {
      max: 35,
    });
    chart.coordinate('polar');
    chart
      .schema()
      .position('x*range')
      .shape('box')
      .style({
        stroke: '#545454',
        fill: '#1890FF',
        fillOpacity: 0.3,
      });
    chart.render();

    setTimeout(() => {
      const newData = [
        { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
        { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
        { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
        { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
        { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
        { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 },
      ];
      const dv1 = new DataView().source(newData);
      dv1.transform({
        type: 'map',
        callback: (obj) => {
          obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
          return obj;
        },
      });

      chart.changeData(dv1.rows);
    }, 1000);
  });

  it('Point chart', () => {
    const data = [
      { gender: 'female', height: 161.2, weight: 51.6 },
      { gender: 'female', height: 167.5, weight: 59 },
      { gender: 'female', height: 159.5, weight: 49.2 },
      { gender: 'female', height: 157, weight: 63 },
      { gender: 'female', height: 155.8, weight: 53.6 },
    ];
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });
    chart.data(data);
    chart.coordinate('polar');
    chart
      .point()
      .position('height*weight')
      .size(4)
      .shape('circle');
    chart.render();

    setTimeout(() => {
      chart.changeData([
        { gender: 'female', height: 161.2, weight: 516 },
        { gender: 'female', height: 159.5, weight: 49.2 },
        { gender: 'female', height: 174, weight: 75.7 },
        { gender: 'female', height: 172.7, weight: 61.1 },
      ]);
    }, 2000);
  });

  it('Path Chart', () => {
    const data = [
      { consumption: 0.65, price: 1, year: 1965 },
      { consumption: 0.66, price: 1.05, year: 1966 },
      { consumption: 0.64, price: 1.1, year: 1967 },
      { consumption: 0.63, price: 1.12, year: 1968 },
      { consumption: 0.55, price: 1.15, year: 1969 },
      { consumption: 0.57, price: 1.19, year: 1970 },
      { consumption: 0.58, price: 1.14, year: 1971 },
      { consumption: 0.59, price: 1, year: 1972 },
      { consumption: 0.57, price: 0.96, year: 1973 },
      { consumption: 0.55, price: 0.92, year: 1974 },
      { consumption: 0.54, price: 0.88, year: 1975 },
      { consumption: 0.55, price: 0.87, year: 1976 },
      { consumption: 0.42, price: 0.89, year: 1977 },
      { consumption: 0.28, price: 1, year: 1978 },
      { consumption: 0.15, price: 1.1, year: 1979 },
    ];
    const div = createDiv();
    div.style.display = 'inline-block';
    const chart = new Chart({
      container: div,
      width: 250,
      height: 200,
    });
    chart.data(data);
    const path = chart
      .path()
      .animate({
        appear: {
          animation: 'pathIn',
        },
      })
      .position('price*consumption')
      .label('year')
      .size(2);
    chart
      .point()
      .position('price*consumption')
      .shape('triangle');
    chart.render();

    setTimeout(() => {
      // path.hide();
      chart.changeData([
        { consumption: 0.58, price: 1.14, year: 1971 },
        { consumption: 0.59, price: 1, year: 1972 },
        { consumption: 0.57, price: 9.6, year: 1973 },
        { consumption: 0.55, price: 0.92, year: 1974 },
        { consumption: 0.54, price: 0.8, year: 1975 },
        { consumption: 0.55, price: 0.87, year: 1976 },
        { consumption: 0.42, price: 0.89, year: 1977 },
        { consumption: 0.28, price: 1, year: 1978 },
      ]);
    }, 1000);
  });
});
