import { Chart } from '@antv/g2';

function css(...styles) {
  return styles
    .map((obj) =>
      Object.entries(obj)
        .map(([k, v]) => k + ':' + v)
        .join(';'),
    )
    .join(';');
}

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data([
  { time: '16', north: 0, south: 0 },
  { time: '18', north: 7, south: -8 },
  { time: '20', north: 6, south: -7 },
  { time: '22', north: 9, south: -8 },
  { time: '00', north: 5, south: -7 },
  { time: '02', north: 8, south: -5 },
  { time: '04', north: 6, south: -7 },
  { time: '06', north: 7, south: -8 },
  { time: '08', north: 9, south: -9 },
  { time: '10', north: 6, south: -9 },
  { time: '12', north: 5, south: -9 },
]);

chart
  .area()
  .encode('x', (d) => d.time)
  .encode('y', 'north')
  .encode('color', () => 'north')
  .encode('shape', 'smooth');

chart
  .area()
  .encode('x', (d) => d.time)
  .encode('y', 'south')
  .encode('color', () => 'south')
  .encode('shape', 'smooth');

chart.interaction('tooltip', {
  css: {
    '.g2-tooltip': {
      background: 'transparent',
      'box-shadow': 'none',
    },
  },
  render: (event, { title, items }) => {
    const containerStyle = () => ({
      background: '#fff',
      'border-radius': '4px',
      padding: '12px',
      'box-shadow': '0 6px 12px 0 rgba(0, 0, 0, 0.12)',
    });

    const itemStyle = (color) => ({
      display: 'inline-block',
      width: '8px',
      height: '8px',
      background: color,
      'border-radius': '50%',
    });

    return `
       <div>
          <div style="${css(containerStyle(), { 'margin-bottom': '20px' })}">
            <span>${title}</span>
            </br>
            <span style="${css(itemStyle(items[0].color))}"></span>
            <span>${items[0].name}</span>
            <span style="float:right">${items[0].value}</span>
          </div>
          <div style="${css(containerStyle())}">
            <span>${title}</span>
            </br>
            <span style=${css(itemStyle(items[1].color))}></span>
            <span>${items[1].name}</span>
            <span style="float:right">${items[1].value}</span>
          </div>
      </div>
    `;
  },
});

chart.render();
