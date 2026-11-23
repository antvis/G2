import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

// mock data
const data = [];
const n = 31;
for (let i = 0; i < 372; i++) {
  const now = new Date();
  const currentTime = new Date(now.getTime() + i * 1000 * 3600 * 24);
  const formattedTime = `${currentTime.getFullYear()}.${String(
    currentTime.getMonth() + 1,
  ).padStart(2, '0')}.${String(currentTime.getDate()).padStart(2, '0')}`;

  data[i] = {};
  data[i].time = formattedTime;

  const random = Math.floor(Math.random() * 10);
  if ((i % n > 2 && i % n < 4) || (i % n >= 6 && i % n < 7)) {
    data[i].value = 30 + random * 7;
  } else if (i % n >= 4 && i % n < 6) {
    data[i].value = 60 + random * 8;
  } else {
    data[i].value = 10 + random * 5;
  }
}

chart.options({
  type: 'interval',
  height: 500,
  data: {
    value: data,
  },
  encode: { x: 'time', y: 'value', color: 'value' },
  scale: { color: { type: 'linear', range: ['#ffffff', '#1890FF'] } },
  coordinate: {
    type: 'helix',
    startAngle: 0.5 * Math.PI,
    endAngle: 12.5 * Math.PI,
  },
  animate: { enter: { type: 'fadeIn' } },
  tooltip: { title: 'time' },
});

chart.render();
