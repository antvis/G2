import { Chart } from '@antv/g2';

// 定义月份名称
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

fetch(
  'https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-calendar.json',
)
  .then((res) => res.json())
  .then((data) => {
    // 获取当前月的第几周,从 0 开始
    function getMonthWeek(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthFirst = new Date(year, month, 0);
      const intervalDays = Math.round(
        (date.getTime() - monthFirst.getTime()) / 86400000,
      );
      const index = Math.floor((intervalDays + monthFirst.getDay()) / 7);
      return index;
    }
    // 加工数据
    // 添加所属月、周几、每个月的第几周
    data.forEach(function (obj) {
      const date = new Date(obj['日期']);
      const month = date.getMonth();
      obj.month = MONTHS[month];
      obj.day = date.getDay();
      obj.week = getMonthWeek(date).toString();
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    chart.scale('涨跌幅', {
      domain: [-10, -5, -2, -1, 0, 1, 2, 5, 10],
      range: [
        '#F51D27',
        '#FA541C',
        '#FFBE15',
        '#FFF2D1',
        '#FFFFFF',
        '#E3F6FF',
        '#85C6FF',
        '#0086FA',
        '#0A61D7',
      ],
    });

    const facetRect = chart
      .facetRect()
      .data(data)
      .encode('x', 'month')
      .style('gap', 20);

    facetRect
      .cell()
      .encode('x', 'day')
      .encode('y', 'week')
      .transform({ type: 'sortY', reverse: true })
      .encode('color', '涨跌幅');

    chart.interaction('elementHighlight', true);

    chart.render();
  });
