import { Chart } from '@antv/g2';

// 构造数据
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

chart.data(data);

chart.scale({
  time: {
    type: 'timeCat',
    mask: 'YYYY.MM.DD',
  },
  value: {
    min: 0,
    nice: true,
  },
});

chart.coordinate('helix', {
  startAngle: 0.5 * Math.PI,
  endAngle: 12.5 * Math.PI,
});

chart.axis('time', {
  line: null,
});

chart
  .interval()
  .position('time*value')
  .color('value', '#ffffff-#1890FF')
  .size(0.45)
  .animate({
    appear: {
      animation: 'fade-in'
    }
  });

chart.render();
