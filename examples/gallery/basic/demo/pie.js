import { Chart } from '@ant/g2';

const data = [
  { type: 'A', value: 10 },
  { type: 'B', value: 8 },
  { type: 'C', value: 32 },
  { type: 'D', value: 15 },
  { type: 'E', value: 15 },
  { type: 'F', value: 15 },
  { type: 'G', value: 5 },
];
const colorMap = {
  A: '#5B8FF9',
  B: '#5AD8A6',
  C: '#5D7092',
  D: '#F6BD16',
  E: '#E8684A',
  F: '#9270CA',
  G: '#FF9D4D',
};

const chart = new Chart({
  container: 'container',
  width: 400,
  height: 400,
  autoFit: false,
});

chart.data(data);
chart.coordinate('theta');
chart.legend(false);
chart.axis(false);
// @ts-ignore
chart
  .interval()
  .position('1*value')
  .color('type', (val) => colorMap[val])
  .adjust('stack')
  .animate({
    enter: {
      duration: 1000,
      ease: 'easeLinear',
    },
  });

chart.render();

setTimeout(() => {
  chart.changeData([
    { type: 'A', value: 10 },
    { type: 'B', value: 43 },
    { type: 'C', value: 32 },
    // { type: 'D', value: 15 },
    { type: 'E', value: 15 },
  ]);
}, 1000);
