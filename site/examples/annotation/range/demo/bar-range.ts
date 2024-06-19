import { Chart } from '@antv/g2';

const data = [
  { city: '北京', 职业: '教师', 平均年收入: 12 },
  { city: '北京', 职业: '医生', 平均年收入: 30 },
  { city: '北京', 职业: '销售', 平均年收入: 18 },
  { city: '北京', 职业: '公务员', 平均年收入: 15 },
  { city: '北京', 职业: '律师', 平均年收入: 40 },
  { city: '北京', 职业: '程序员', 平均年收入: 35 },
  { city: '上海', 职业: '教师', 平均年收入: 13 },
  { city: '上海', 职业: '医生', 平均年收入: 29 },
  { city: '上海', 职业: '销售', 平均年收入: 19 },
  { city: '上海', 职业: '公务员', 平均年收入: 16 },
  { city: '上海', 职业: '律师', 平均年收入: 42 },
  { city: '上海', 职业: '程序员', 平均年收入: 36 },
  { city: '杭州', 职业: '教师', 平均年收入: 11 },
  { city: '杭州', 职业: '医生', 平均年收入: 25 },
  { city: '杭州', 职业: '销售', 平均年收入: 16 },
  { city: '杭州', 职业: '公务员', 平均年收入: 14 },
  { city: '杭州', 职业: '律师', 平均年收入: 35 },
  { city: '杭州', 职业: '程序员', 平均年收入: 28 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart
  .data([
    { y: [0, 25], region: '1' },
    { y: [25, 50], region: '2' },
  ])
  .rangeY()
  .encode('y', 'y')
  .style('fill', (d) => (d.region === '1' ? '#d8d0c0' : '#a3dda1'))
  .style('fillOpacity', 0.4)
  .animate('enter', { type: 'fadeIn' });

chart
  .interval()
  .data(data)
  .encode('x', '职业')
  .encode('y', '平均年收入')
  .encode('color', 'city')
  .transform({ type: 'dodgeX' })
  .axis('y', { title: '平均年收入', labelFormatter: (d) => d + '万' })
  .tooltip({
    items: [
      (d) => ({
        name: '平均年收入',
        value: d.平均年收入 + '万',
        channel: 'y',
      }),
    ],
  });

chart.render();
