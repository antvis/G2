import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-calendar.json')
  .then(res => res.json())
  .then(data => {
    const { DataView } = DataSet;

    // 获取当前月的第几周,从 0 开始
    function getMonthWeek(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthFirst = new Date(year, month, 0);
      const intervalDays = Math.round((date.getTime() - monthFirst.getTime()) / 86400000);
      const index = Math.floor((intervalDays + monthFirst.getDay()) / 7);
      return index;
    }
    // 加工数据
    // 增加涨幅、跌幅
    // 添加所属月、周几、每个月的第几周
    data.forEach(function (obj) {
      const date = new Date(obj['日期']);
      const month = date.getMonth();
      obj.month = MONTHS[month];
      obj.day = date.getDay();
      obj.week = getMonthWeek(date).toString();
    });

    // 对数据进行排序
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'sort-by',
        fields: ['day'],
        order: 'DESC'
      });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      padding: [20, 120, 50, 120]
    });
    chart.data(dv.rows);
    chart.scale({
      day: {
        type: 'cat'
      },
      week: {
        type: 'cat',
        values: ['5', '4', '3', '2', '1', '0']
      },
      涨跌幅: {
        type: 'linear',
        min: -10,
        max: 10,
        sync: true
      },
      time: {
        type: 'time'
      },
      日期: {
        type: 'time'
      }
    });

    chart.axis(false);
    chart.legend('涨跌幅', {
      offset: 0
    });
    chart.tooltip({
      title: '日期',
      showMarkers: false
    });
    chart.facet('list', {
      fields: ['month'],
      cols: 3,
      padding: [0, 15, 30, 15],
      columnTitle: {
        offsetY: -10,
        style: {
          fontSize: 12,
          textAlign: 'center',
          fill: '#666'
        }
      },
      eachView: view => {
        view.polygon().position('day*week')
          .color('涨跌幅', '#F51D27-#FA541C-#FFBE15-#FFF2D1-#E3F6FF-#85C6FF-#0086FA-#0A61D7')
          .style({
            lineWidth: 1,
            stroke: '#fff'
          });
      }
    });

    chart.interaction('element-active');

    chart.render();
  });
