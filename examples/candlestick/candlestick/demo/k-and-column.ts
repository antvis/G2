import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json')
  .then(res => res.json())
  .then(data => {
    // 设置状态量，时间格式建议转换为时间戳，转换为时间戳时请注意区间
    const ds = new DataSet();
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
          obj.range = [obj.start, obj.end, obj.max, obj.min];
          return obj;
        }
      });
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 400,
      padding: [10, 40, 40, 40]
    });
    chart.scale({
      time: {
        type: 'timeCat',
        range: [0, 1],
        tickCount: 4,
      },
      trend: {
        values: ['上涨', '下跌']
      },
      volumn: { alias: '成交量' },
      start: { alias: '开盘价' },
      end: { alias: '收盘价' },
      max: { alias: '最高价' },
      min: { alias: '最低价' },
      range: { alias: '股票价格' }
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: '<li class="g2-tooltip-list-item" data-index={index}>'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{name}{value}</li>'
    });

    const kView = chart.createView({
      region: {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.7 },
      }
    });
    kView.data(dv.rows);
    kView.schema()
      .position('time*range')
      .color('trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .shape('candle')
      .tooltip('time*start*end*max*min', (time, start, end, max, min) => {
        return {
          name: time,
          value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
            + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
            + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
            + '<span style="padding-left: 16px">最低价：' + min + '</span>'
        };
      });

    const barView = chart.createView({
      region: {
        start: { x: 0, y: 0.7 },
        end: { x: 1, y: 1 },
      }
    });
    barView.data(dv.rows);
    barView.scale('volumn', {
      tickCount: 2,
    })
    barView.axis('time', {
      tickLine: null,
      label: null
    });
    barView.axis('volumn', {
      label: {
        formatter: val => {
          return +val / 1000 + 'k';
        }
      }
    });
    barView.interval()
      .position('time*volumn')
      .color('trend', val => {
        if (val === '上涨') {
          return '#f04864';
        }

        if (val === '下跌') {
          return '#2fc25b';
        }
      })
      .tooltip('time*volumn', (time, volumn) => {
        return {
          name: time,
          value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
        };
      });

    chart.render();
  });
