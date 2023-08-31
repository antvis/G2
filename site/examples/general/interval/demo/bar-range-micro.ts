import { Chart } from '@antv/g2';

const floatTimestamp = (s) => +new Date(s) + +`0.${s.slice(s.length - 3)}`;

const format = (n) => {
  const x = Math.floor(n);
  const s = n + '';
  const d = new Date(x);
  const Y = d.getFullYear();
  const M = d.getMonth() + 1;
  const D = d.getDate();
  const H = d.getHours();
  const MN = d.getMinutes();
  const S = d.getSeconds();
  const MS = d.getMilliseconds();
  const MCM = s.slice(s.length - 3);
  return `${Y}-${M}-${D} ${H}:${MN}:${S}.${MS}${MCM}`;
};

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data([
    {
      task: 'task0',
      startTime: '2023-06-28 03:30:33.900123', // micro seconds
      endTime: '2023-06-28 03:30:33.900678', // micro seconds
      status: '0',
    },
    {
      task: 'task0',
      startTime: '2023-06-28 03:30:33.901123',
      endTime: '2023-06-28 03:30:33.902678',
      status: '1',
    },
  ])
  .encode('x', 'task')
  // Add float part to distinguish y and y1
  .encode('y', (d) => floatTimestamp(d.startTime))
  .encode('y1', (d) => floatTimestamp(d.endTime))
  .encode('color', 'status')
  .scale('y', {
    type: 'time',
    domain: [
      new Date('2023-06-28 03:30:33.900'),
      new Date('2023-06-28 03:30:33.903'),
    ],
  })
  .coordinate({ transform: [{ type: 'transpose' }] })
  .tooltip({ channel: 'y', valueFormatter: format })
  .tooltip({ channel: 'y1', valueFormatter: format });

chart.render();
