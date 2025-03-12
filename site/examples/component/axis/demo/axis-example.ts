import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval', // 设置图表类型为柱状图
  marginTop: 40, // 设置图表的上边距像素
  // 设置数据源
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  },
  // 设置数据编码
  encode: {
    x: 'letter',
    y: 'frequency',
  },
  // 配置坐标轴
  axis: {
    // 配置 y 轴
    y: {
      // 这部分是轴标题的配置
      title: 'Frequency', // 设置 y 轴标题
      titleSpacing: 30, // 设置 y 轴标题与轴线之间的间距
      titleFill: 'steelblue', // 设置 y 轴标题的颜色

      // 这部分是轴线和箭头的配置
      line: true, // 显示 y 轴线
      arrow: true, // 显示 y 轴箭头
      lineArrowOffset: 10, //设置 y 轴箭头偏移量
      lineArrowSize: 30, // 设置 y 轴箭头大小
      lineLineWidth: 10, // 设置 y 轴线的宽度

      // 这部分是刻度线的配置
      tickLength: 20, // 设置 y 轴刻度线的长度
      tickFilter: (_, i) => i % 3 !== 0, // 过滤 y 轴刻度线，只显示每隔 3 个刻度线

      // 这部分是标签的配置
      labelFormatter: '.0%', // 设置 y 轴标签的格式为百分比形式，保留一位小数

      // 这部分是网格线的配置
      gridLineDash: null, // 不使用虚线网格线
      gridStroke: 'red', // 设置网格线颜色为红色
      gridStrokeWidth: 5, // 设置网格线宽度
      gridAreaFill: '#eee', // 设置网格区域的填充颜色
    },
    // 配置 x 轴
    x: {
      // 这部分是轴标题的配置
      title: 'Letter', // 设置 x 轴标题
      labelFontSize: 30, // 设置 x 轴标签的字体大小
      labelFormatter: (d) => d.repeat(3), // 设置 x 轴标签的格式，将每个标签重复 3 次
      labelSpacing: 30, // 设置 x 轴标签与轴线之间的间距

      // 这部分是轴线和箭头的配置
      line: true, // 显示 y 轴线
      arrow: true, // 显示 y 轴箭头
      lineArrowOffset: 10, //设置 y 轴箭头偏移量
      lineArrowSize: 30, // 设置 y 轴箭头大小
      lineLineWidth: 10, // 设置 y 轴线的宽度
    },
  },
});

chart.render();
