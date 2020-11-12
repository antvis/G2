import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

const data1 = [
  { site: '001', pv: 300 },
  { site: '002', pv: 400 },
  { site: '003', pv: 500 },
  { site: '004', pv: 900 },
  { site: '005', pv: 130 },
  { site: '006', uv: 350 },
  { site: '007', pv: 900 },
];

const data2 = [
  { site: '001', uv: 10 },
  { site: '002', uv: 4 },
  { site: '003', uv: 4 },
  { site: '004', uv: 5 },
  { site: '005', uv: 5 },
  { site: '006', uv: 9 },
];

const series_data1 = [
  {site: "001", type: "类型 A", count: 21},
  {site: "001", type: "类型 B", count: 16},
  {site: "002", type: "类型 A", count: 25},
  {site: "002", type: "类型 B", count: 16},
  {site: "003", type: "类型 A", count: 25},
  {site: "003", type: "类型 B", count: 15},
  {site: "004", type: "类型 A", count: 25},
  {site: "004", type: "类型 B", count: 10},
];

const series_data2 = [
  {site: "001", type: "类型 C", count: 201},
  {site: "001", type: "类型 D", count: 160},
  {site: "002", type: "类型 C", count: 250},
  {site: "002", type: "类型 D", count: 160},
  {site: "003", type: "类型 C", count: 250},
  {site: "003", type: "类型 D", count: 100},
];

describe('2996', () => {
  it('rect coordinate', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      syncViewPadding: true,
    });
    chart.axis(false);
    chart.tooltip({
      shared: true
    });

    const leftView = chart.createView({});
    leftView.data(data1);
    leftView.scale({
      site: {
        type: 'cat',
      }
    });
    leftView.line({connectNulls: true}).position('site*pv');

    leftView.axis('pv', {
      position: 'left'
    });


    const rightView = chart.createView({});
    rightView.data(data2);
    rightView.scale({
      site: {
        type: 'cat',
      }
    });
    rightView.interval().position('site*uv');

    rightView.axis('uv', {
      position: 'right'
    });
    
    chart.render();

    // 没有声明 sync
    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(6);

    expect(leftView.getScaleByField('site').range[0].toFixed(4)).not.toEqual(rightView.getScaleByField('site').range[0].toFixed(4))
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).not.toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新 sync
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });

   
    chart.render();

    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(7);

    expect(leftView.getScaleByField('site').range[0].toFixed(4)).toEqual(rightView.getScaleByField('site').range[0].toFixed(4))
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新，用户指定 range，则仅更新 stage，不更新 range
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0, 0.5],
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0.6, 1],
      }
    });

    chart.render();

    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(7);

    expect(leftView.getScaleByField('site').range).toEqual([0, 0.5])
    expect(rightView.getScaleByField('site').range).toEqual([0.6, 1])

    // 其中一个数据更新为空数组，期待正常渲染
    leftView.data(data1);
    rightView.data([]);
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });
    chart.render();
    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(7);

    expect(leftView.getScaleByField('site').range[0].toFixed(4)).toEqual(rightView.getScaleByField('site').range[0].toFixed(4))
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).toEqual(rightView.getScaleByField('site').range[1].toFixed(4))
    chart.destroy();
  });

  it('polar coordinate', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      syncViewPadding: true,
    });
    chart.axis(false);
    chart.tooltip({
      shared: true
    });
    chart.coordinate({
      type: 'polar',
    });

    const leftView = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    });
    leftView.data(data1);
    leftView.scale({
      site: {
        type: 'cat',
      }
    });
    leftView.interval({}).position('site*pv');
    leftView.axis('site', {});


    const rightView = chart.createView({
      region: {
        start: { x: 0.5, y: 0 },
        end: { x: 1, y: 1 },
      },
    });
    rightView.data(data2);
    rightView.scale({
      site: {
        type: 'cat',
      }
    });
    rightView.interval().position('site*uv');

    rightView.axis('uv', {
      position: 'right'
    });
    
    chart.render();

    // 没有声明 sync
    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(6);
    expect(leftView.getScaleByField('site').range[0]).toBe(0);
    expect(rightView.getScaleByField('site').range[0]).toBe(0);
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).not.toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新 sync
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });

   
    chart.render();

    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(7);
    expect(leftView.getScaleByField('site').range[0]).toBe(0);
    expect(rightView.getScaleByField('site').range[0]).toBe(0);
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新，用户指定 range，则仅更新 stage，不更新 range
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0, 0.5],
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0.6, 1],
      }
    });

    chart.render();

    expect(leftView.getScaleByField('site').values.length).toBe(7);
    expect(rightView.getScaleByField('site').values.length).toBe(7);

    expect(leftView.getScaleByField('site').range).toEqual([0, 0.5])
    expect(rightView.getScaleByField('site').range).toEqual([0.6, 1])

    chart.destroy();
  });

  it('polar coordinate with multiplePieWidthRatio', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      syncViewPadding: true,
    });
    chart.axis(false);

    chart.tooltip({
      shared: true
    });

    chart.coordinate('polar', {
      innerRadius: 0.1,
      radius: 0.8
    }).transpose();

    const leftView = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    });
    leftView.data(series_data1);
    leftView.scale({
      site: {
        type: 'cat',
      }
    });
    leftView.interval({
      theme: {
        multiplePieWidthRatio: 0.5
      }
    }).position('site*count').color('type');

    leftView.axis('site', {});

    const rightView = chart.createView({
      region: {
        start: { x: 0.5, y: 0 },
        end: { x: 1, y: 1 },
      },
    });
    rightView.data(series_data2);
    rightView.scale({
      site: {
        type: 'cat',
      }
    });
    rightView.interval({
      theme: {
        multiplePieWidthRatio: 0.5
      }
    }).position('site*count').color('type');
    rightView.axis('site', {
     
    });
    chart.render();

    // 没有声明 sync
    expect(leftView.getScaleByField('site').values.length).toBe(4);
    expect(rightView.getScaleByField('site').values.length).toBe(3);
    expect(leftView.getScaleByField('site').range[0].toFixed(4)).not.toEqual(rightView.getScaleByField('site').range[0].toFixed(4))
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).not.toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新 sync
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
      }
    });

    chart.render();

    expect(leftView.getScaleByField('site').values.length).toBe(4);
    expect(rightView.getScaleByField('site').values.length).toBe(4);
    expect(leftView.getScaleByField('site').range[0].toFixed(4)).toEqual(rightView.getScaleByField('site').range[0].toFixed(4))
    expect(leftView.getScaleByField('site').range[1].toFixed(4)).toEqual(rightView.getScaleByField('site').range[1].toFixed(4))

    // 更新，用户指定 range，则仅更新 stage，不更新 range
    leftView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0, 0.5],
      }
    });
    rightView.scale({
      site: {
        type: 'cat',
        sync: true,
        range: [0.6, 1],
      }
    });

    chart.render();
    expect(leftView.getScaleByField('site').values.length).toBe(4);
    expect(rightView.getScaleByField('site').values.length).toBe(4);

    expect(leftView.getScaleByField('site').range).toEqual([0, 0.5])
    expect(rightView.getScaleByField('site').range).toEqual([0.6, 1])

    chart.destroy();
  });
});