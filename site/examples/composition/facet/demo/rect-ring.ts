import { Chart } from '@antv/g2';
const chart = new Chart({ container: 'container' });
const container = chart.getContainer();

const button = document.createElement('button');
button.innerText = 'Update Data';
button.style.display = 'block';
container.appendChild(button);

const div = document.createElement('div');
container.appendChild(div);

chart.options({
  type: 'facetRect',
  data: [
    { name: 'CPU', percent: 27, color: 'rgba(90, 132, 226, 1)' },
    { name: '内存', percent: 81, color: 'rgba(250, 57, 57, 1)' },
    { name: '硬盘', percent: 68, color: 'rgba(253, 192, 45, 1)' },
  ],
  encode: {
    x: 'name',
  },
  axis: false,
  legend: false,
  children: [
    {
      type: 'view',
      frame: false,
      coordinate: { type: 'radial', innerRadius: 0.7, outerRadius: 0.95 },
      children: [
        {
          type: 'interval',
          encode: {
            y: 100,
            size: 52,
          },
          scale: {
            y: { zero: true },
          },
          axis: false,
          style: {
            fill: 'rgba(232, 232, 232, 1)',
          },
          animate: false,
        },
        {
          type: 'interval',
          encode: {
            y: 'percent',
            color: 'color',
            size: 80,
          },
          scale: {
            color: { type: 'identity' },
          },
          tooltip: {
            items: [{ name: '已使用', channel: 'y' }],
          },
          axis: false,
          style: {
            radius: 26,
            shadowColor: 'color',
            shadowBlur: 10,
            shadowOffsetX: -1,
            shadowOffsetY: -1,
          },
          animate: {
            enter: { type: 'waveIn', duration: 1000 },
          },
        },
        {
          type: 'text',
          encode: {
            text: (d) => `${d.name} ${d.percent}%`,
          },
          style: {
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: 15,
            color: 'rgba(74, 74, 74, 1)',
            x: '50%',
            y: '50%',
          },
          tooltip: false,
        },
      ],
    },
  ],
});

button.onclick = () => {
  chart
    .options({
      data: [
        { name: 'CPU', percent: 50, color: 'rgba(90, 132, 226, 1)' },
        { name: '内存', percent: 70, color: 'rgba(250, 57, 57, 1)' },
        { name: '硬盘', percent: 30, color: 'rgba(253, 192, 45, 1)' },
      ],
    })
    .render();
};

chart.render();
