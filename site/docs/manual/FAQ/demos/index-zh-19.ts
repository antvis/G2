import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  data: [
    { letter: 'A', frequency: 0.08167 },
    { letter: 'B', frequency: 0.01492 },
    { letter: 'C', frequency: 0.02782 },
  ],
  encode: { x: 'letter', y: 'frequency' },
  state: {
    // 悬停时：绿色填充 + 黑色描边
    active: { fill: 'green', stroke: 'black', strokeWidth: 1 },
    // 选中时：红色填充（会覆盖 active 的 fill）+ 保留 active 的描边
    selected: { fill: 'red' },
  },
  interaction: { elementHighlight: true, elementSelect: true },
});

chart.render();
