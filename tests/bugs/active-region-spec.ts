import DataSet from '@antv/data-set';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('active-region', () => {
  let chart;
  it('dodge polar', () => {
    const container = createDiv();
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

    chart = new Chart({
      container,
      width: 400,
      height: 300,
    });

    chart.coordinate('polar', {
      innerRadius: 0.4
    });

    chart.data(data);
    chart.tooltip({
      showMarkers: false,
      shared: true,
      showContent: false
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1,
        },
      ]);

    chart.interaction('active-region');
    chart.render();

    const point = chart.getXY({ name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 });
    chart.emit('plot:mousemove', point);
    const regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];

    expect(regionShape.getBBox().width).toBeCloseTo(96.24487867752643);
    expect(regionShape.getBBox().height).toBeCloseTo(79.27885913672948);
  });

  it('Histogram', () => {
    const values = [
      1.2,
      3.4,
      3.7,
      4.3,
      5.2,
      5.8,
      6.1,
      6.5,
      6.8,
      7.1,
      7.3,
      7.7,
      8.3,
      8.6,
      8.8,
      9.1,
      9.2,
      9.4,
      9.5,
      9.7,
      10.5,
      10.7,
      10.8,
      11.0,
      11.0,
      11.1,
      11.2,
      11.3,
      11.4,
      11.4,
      11.7,
      12.0,
      12.9,
      12.9,
      13.3,
      13.7,
      13.8,
      13.9,
      14.0,
      14.2,
      14.5,
      15,
      15.2,
      15.6,
      16.0,
      16.3,
      17.3,
      17.5,
      17.9,
      18.0,
      18.0,
      20.6,
      21,
      23.4,
    ];

    const data = values.map((value) => {
      return {
        value,
      };
    });
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field: 'value',
      binWidth: 2,
      as: ['value', 'count'],
    });

    chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });
    chart.data(dv.rows);
    chart.scale({
      value: {
        min: 0,
        tickInterval: 2,
      },
      count: {
        max: 14,
        nice: true,
      },
    });

    chart.tooltip({
      showMarkers: false,
      position: 'top',
      shared: true,
    });

    const interval = chart.interval().position('value*count');
    chart.interaction('active-region');

    chart.render();

    const point = chart.getXY({ count: 11, value: 11 });
    chart.emit('plot:mousemove', point);

    const regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];

    expect(regionShape.getBBox().width).toBeCloseTo(interval.elements[0].getBBox().width);
  });

  it('coordinate scale', () => {
    const data = [
      { label: 'Mon.', type: 'series1', value: 2800 },
      { label: 'Mon.', type: 'series2', value: 2260 },
      { label: 'Tues.', type: 'series1', value: 1800 },
      { label: 'Tues.', type: 'series2', value: 1300 },
      { label: 'Wed.', type: 'series1', value: 950 },
      { label: 'Wed.', type: 'series2', value: 900 },
      { label: 'Thur.', type: 'series1', value: 500 },
      { label: 'Thur.', type: 'series2', value: 390 },
      { label: 'Fri.', type: 'series1', value: 170 },
      { label: 'Fri.', type: 'series2', value: 100 },
    ];
    chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
    });

    chart.data(data);

    chart
      .coordinate()
      .transpose()
      .scale(1, -1);

    chart.axis('value', {
      position: 'right',
    });
    chart.axis('label', {
      label: {
        offset: 12,
      },
    });

    chart.tooltip({
      shared: true,
      showMarkers: false,
      showContent: false,
    });

    chart
      .interval()
      .position('label*value')
      .color('type')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ]);
    chart.interaction('active-region');
    chart.render();

    const point = chart.getXY({ label: 'Thur.', type: 'series1', value: 500 });
    chart.emit('plot:mousemove', point);

    const regionShape = chart.backgroundGroup.findAll((el) => {
      return el.get('name') === 'active-region';
    })[0];

    expect(regionShape.getBBox().minY).toBeCloseTo(203.23046875);
  });

  afterEach(() => {
    chart.destroy();
  });
});
