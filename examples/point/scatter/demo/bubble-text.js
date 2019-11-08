const data = [
  { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
  { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
  { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
  { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
  { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
  { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
  { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
  { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
  { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
  { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
  { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
  { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
  { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
  { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
  { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
];
const chart = new G2.Chart({
  container: 'container',
  forceFit: true,
  height: 500,
  padding: [ 20, 20, 50, 80 ],
  plotBackground: {
    stroke: '#ccc', // 边颜色
    lineWidth: 1 // 边框粗细
  } // 绘图区域背景设置
});
chart.source(data, {
  x: {
    alias: 'Daily fat intake', // 定义别名
    tickInterval: 5, // 自定义刻度间距
    nice: false, // 不对最大最小值优化
    max: 96, // 自定义最大值
    min: 62 // 自定义最小是
  },
  y: {
    alias: 'Daily sugar intake',
    tickInterval: 50,
    nice: false,
    max: 165,
    min: 0
  },
  z: {
    alias: 'Obesity(adults) %'
  }
});
// 开始配置坐标轴
chart.axis('x', {
  label: {
    formatter: val => {
      return val + ' gr'; // 格式化坐标轴显示文本
    }
  },
  grid: {
    lineStyle: {
      stroke: '#d9d9d9',
      lineWidth: 1,
      lineDash: [ 2, 2 ]
    }
  }
});
chart.axis('y', {
  title: {
    offset: 64
  },
  label: {
    formatter: val => {
      if (val > 0) {
        return val + ' gr';
      }
    }
  }
});
chart.legend(false);
chart.tooltip({
  title: 'country'
});
chart
  .point()
  .position('x*y')
  .color('#1890ff')
  .size('z', [ 10, 40 ])
  .label('name*country', {
    offset: 0, // 文本距离图形的距离
    textStyle: {
      fill: '#1890FF'
    }
  })
  .opacity(0.3)
  .shape('circle')
  .tooltip('x*y*z')
  .style({
    lineWidth: 1,
    stroke: '#1890ff'
  });
chart.guide().line({
  top: true,
  start: [ 65, 'min' ],
  end: [ 65, 'max' ],
  text: {
    content: 'Safe fat intake 65g/day',
    position: 'end',
    autoRotate: false,
    style: {
      textAlign: 'start'
    }
  }
});
chart.guide().line({
  top: true,
  start: [ 'min', 50 ],
  end: [ 'max', 50 ],
  text: {
    content: 'Safe sugar intake 50g/day',
    position: 'end',
    style: {
      textAlign: 'end'
    }
  }
});
chart.render();
