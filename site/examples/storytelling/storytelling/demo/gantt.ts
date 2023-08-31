/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=gantt_1
 */
import { Chart } from '@antv/g2';

const events = [
  { name: 'event planning', startTime: 1, endTime: 4 },
  { name: 'layout logistics', startTime: 3, endTime: 13 },
  { name: 'select vendors', startTime: 5, endTime: 8 },
  { name: 'hire venue', startTime: 9, endTime: 13 },
  { name: 'hire caterer', startTime: 10, endTime: 14 },
  { name: 'hire event decorators', startTime: 12, endTime: 17 },
  { name: 'rehearsal', startTime: 14, endTime: 16 },
  { name: 'event celebration', startTime: 17, endTime: 18 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart
  .interval()
  .data(events)
  .encode('x', 'name')
  .encode('y', ['endTime', 'startTime'])
  .encode('color', 'name')
  .encode('enterDuration', (d) => d.endTime - d.startTime)
  .encode('enterDelay', 'startTime')
  .scale('enterDuration', {
    zero: true,
    range: [0, 3000],
  });

chart.render();
