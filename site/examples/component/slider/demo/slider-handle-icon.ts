import { Chart } from '@antv/g2';
import { Circle, Path, Group } from '@antv/g';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  },
  encode: { x: 'date', y: 'close' },
  slider: {
    x: {
      values: [0.3, 0.7],
      labelFormatter: (d) => new Date(d).toLocaleDateString(),
      // 自定义手柄图标 - 钻石形状带渐变
      handleIconShape: (type) => {
        const group = new Group();

        // 创建钻石形状路径
        const diamond = new Path({
          style: {
            d: [
              ['M', 0, -8], // 上顶点
              ['L', 6, 0], // 右顶点
              ['L', 0, 8], // 下顶点
              ['L', -6, 0], // 左顶点
              ['Z'], // 闭合
            ],
            // 使用渐变填充
            fill:
              type === 'start'
                ? 'l(90) 0:#667eea 1:#764ba2' // 紫色渐变
                : 'l(90) 0:#f093fb 1:#f5576c', // 粉色渐变
            stroke: '#fff',
            lineWidth: 2,
            shadowColor: type === 'start' ? '#667eea' : '#f5576c',
            shadowBlur: 8,
            shadowOffsetY: 2,
          },
        });

        // 添加内部高光效果
        const highlight = new Path({
          style: {
            d: [['M', 0, -6], ['L', 3, -1], ['L', 0, -3], ['Z']],
            fill: 'rgba(255, 255, 255, 0.6)',
          },
        });

        // 添加中心圆点装饰
        const centerDot = new Circle({
          style: {
            cx: 0,
            cy: 0,
            r: 2,
            fill: '#fff',
            opacity: 0.8,
          },
        });

        group.appendChild(diamond);
        group.appendChild(highlight);
        group.appendChild(centerDot);

        return group;
      },
      handleIconSize: 20,
      // 美化选区样式
      selectionFill:
        'l(0) 0:rgba(102, 126, 234, 0.1) 1:rgba(245, 87, 108, 0.1)',
      selectionStroke: '#667eea',
      selectionLineWidth: 2,
      // 美化滑轨样式
      trackFill: '#f5f7fa',
      trackSize: 18,
      // 美化手柄标签样式
      handleLabelFill: '#4a5568',
      handleLabelFontSize: 12,
      handleLabelFontWeight: 600,
    },
  },
  style: {
    stroke: '#667eea',
    lineWidth: 2,
  },
});

chart.render();
