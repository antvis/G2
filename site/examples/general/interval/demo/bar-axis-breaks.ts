import { Chart } from '@antv/g2';

const axisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const data1 = [1500, 2032, 2001, 3154, 2190, 4330, 6410];
const data2 = [1200, 1320, 1010, 1340, 900, 2300, 2100];
const data3 = [3106212, 3102118, 3102643, 3104631, 3106679, 3102300, 3104000];
const data4 = [103200, 100320, 103010, 102340, 103900, 103300, 103200];

const data = axisData.flatMap((name, i) => [
  { name, value: data1[i], type: 'Sports' },
  { name, value: data2[i], type: 'Strategy' },
  { name, value: data3[i], type: 'Shooter' },
  { name, value: data4[i], type: 'Other' },
]);

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data(data)
  .encode('x', 'name')
  .encode('y', 'value')
  .transform({ type: 'dodgeX' })
  .encode('color', 'type')
  .interaction('tooltip', { shared: true })
  .axis('x', { title: false })
  .axis('y', {
    title: false,
    labelAutoHide: false,
    transform: [],
    breaks: [
      {
        start: 5000,
        end: 50000,
        gap: '3%',
      },
      {
        start: 105000,
        end: 3100000,
        gap: '3%',
        vertices: 60,
        verticeOffset: 4,
        compress: 'end',
      },
    ],
  });

chart.render();
