import { Chart } from '@antv/g2';

// 定义月份名称及分类
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

// 预计算月份位置 (1-12月分4行3列排列)
const MONTH_POSITIONS = Array.from({ length: 12 }, (_, month) => {
  const monthNum = month + 1;
  const row = Math.ceil(monthNum / 3);
  const col = ((monthNum - 1) % 3) + 1;
  return {
    row: String(row),
    col: String(col),
  };
});

fetch(
  'https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-calendar.json',
)
  .then((res) => res.json())
  .then((data) => {
    // 优化数据处理: 减少Date对象创建和计算
    const processedData = data.map((obj) => {
      const date = new Date(obj['日期']);
      const month = date.getMonth();
      const dayOfMonth = date.getDate();

      // 计算当前月的第一天是星期几（只计算一次）
      const firstDayWeek = new Date(date.getFullYear(), month, 1).getDay();
      const monthPosition = MONTH_POSITIONS[month];

      return {
        ...obj,
        date,
        month: MONTHS[month],
        monthXCategory: monthPosition.col,
        monthYCategory: monthPosition.row,
        position: `${month + 1}月`,
        day: date.getDay(),
        week: Math.floor((dayOfMonth + firstDayWeek - 1) / 7),
      };
    });

    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 800,
      paddingTop: 100,
      paddingRight: 40,
      paddingBottom: 100,
      paddingLeft: 80,
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
      .data(processedData)
      .scale('x', { type: 'band', compare: (a, b) => Number(a) - Number(b) })
      .scale('y', { type: 'band', compare: (a, b) => Number(a) - Number(b) })
      .encode('x', 'monthXCategory')
      .encode('y', 'monthYCategory')
      .axis('x', { title: false, label: false, tick: false })
      .axis('y', { title: false, label: false, tick: false });

    facetRect
      .cell()
      .scale('x', {
        type: 'band',
        compare: (a: number, b: number) => a - b,
      })
      .scale('y', {
        type: 'band',
        compare: (a: number, b: number) => a - b,
      })
      .encode('x', 'day')
      .axis('x', {
        title: false,
        label: false,
        tick: false,
        grid: false,
      })
      .encode('y', 'week')
      .axis('y', {
        title: false,
        label: false,
        tick: false,
        grid: false,
      })
      .transform({ type: 'sortY', by: 'x' })
      .attr('frame', false)
      .encode('color', '涨跌幅');

    chart.interaction('elementHighlight', true);

    chart.render();
  });
