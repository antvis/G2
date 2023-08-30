import { Chart } from '@antv/g2';

const sex = [
  { city: 'A', sex: '男', value: 52 },
  { city: 'A', sex: '女', value: 48 },
  { city: 'B', sex: '男', value: 130 },
  { city: 'B', sex: '女', value: 70 },
];
const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const keyframe = chart.timingKeyframe();

keyframe
  .interval()
  .data(sex)
  .transform({ type: 'groupX', y: 'sum' })
  .encode('x', 'city')
  .encode('y', 'value')
  .encode('key', 'city');

keyframe
  .interval()
  .data(sex)
  .transform({ type: 'dodgeX' })
  .encode('x', 'city')
  .encode('y', 'value')
  .encode('color', 'sex')
  .encode('groupKey', 'city');

chart.render();
