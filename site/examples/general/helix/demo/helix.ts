import { Chart } from '@antv/g2';

// mock data
const data = [];
const n = 31;
for (let i = 0; i < 372; i++) {
  const now = Date();
  data[i] = {};
  data[i].time = new Date(now).getTime() + i * 1000 * 3600 * 24;
  const random = Math.floor(Math.random() * 10);
  if ((i % n > 2 && i % n < 4) || (i % n >= 6 && i % n < 7)) {
    data[i].value = 30 + random * 7;
  } else if (i % n >= 4 && i % n < 6) {
    data[i].value = 60 + random * 8;
  } else {
    data[i].value = 10 + random * 5;
  }
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
  height: 500,
});

chart.data({
  value: data,
  transform: [
    {
      type: 'map',
      callback: (d) => {
        const date = new Date(d.time);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return {
          time: `${year}.${month}.${day}`,
          value: d.value,
        };
      },
    },
  ],
});

chart.coordinate({
  type: 'helix',
  startAngle: 0.5 * Math.PI,
  endAngle: 12.5 * Math.PI,
});

chart
  .interval()
  .encode('x', 'time')
  .encode('y', 'value')
  .encode('color', 'value')
  .scale('color', {
    type: 'linear',
    range: ['#ffffff', '#1890FF'],
  })
  .tooltip({
    title: 'time',
  })
  .animate('enter', {
    type: 'fadeIn',
  });

chart.render();
