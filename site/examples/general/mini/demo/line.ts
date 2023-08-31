import { Chart } from '@antv/g2';

const data = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
  546, 983, 340, 539, 243, 226, 192,
];

const chart = new Chart({
  container: 'container',
  width: 480,
  height: 80,
});

chart.data(data);

chart
  .line()
  .encode('x', (_, idx) => idx)
  .encode('y', (d) => d)
  .encode('shape', 'smooth')
  .animate('enter', { type: 'fadeIn' })
  .label({
    selector: 'last',
    text: (d) => d,
    textAlign: 'right',
    textBaseline: 'bottom',
    dx: -10,
    dy: -10,
    connector: true,
    fontSize: 10,
  })
  .axis(false);

chart.interaction('tooltip', {
  render: (e, { title, items }) => items[0].value,
});

chart.render();
