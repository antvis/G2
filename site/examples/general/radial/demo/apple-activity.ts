import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', width: 244, height: 244 });

const spaceLayer = chart.spaceLayer().data([
  {
    name: 'activity1',
    percent: 2370,
    color: '#1ad5de',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
  },
  {
    name: 'activity2',
    percent: 800,
    color: '#a0ff03',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
  },
  {
    name: 'activity3',
    percent: 650,
    color: '#e90b3a',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
  },
]);

spaceLayer
  .view()
  .coordinate({ type: 'radial', innerRadius: 0.2 })
  .interval()
  .encode('x', 'name')
  .encode('y', 1)
  .encode('size', 52)
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .axis('x', false)
  .axis('y', false)
  .style('fillOpacity', 0.25)
  .animate('enter', { type: 'waveIn', duration: 400 });

spaceLayer
  .view()
  .coordinate({ type: 'radial', innerRadius: 0.2 })
  .axis('x', false)
  .axis('y', false)
  .scale('color', { type: 'identity' })
  .scale('y', { domain: [0, 3000] })
  .call((node) =>
    node
      .interval()
      .encode('x', 'name')
      .encode('y', 'percent')
      .encode('color', (d) => d.color)
      .encode('size', 52)
      .style('radius', 26)
      .style('shadowColor', 'rgba(0,0,0,0.45)')
      .style('shadowBlur', 20)
      .style('shadowOffsetX', -2)
      .style('shadowOffsetY', -5)
      .animate('enter', {
        type: 'waveIn',
        easing: 'easing-out-bounce',
        duration: 1000,
      }),
  )
  .call((node) =>
    node
      .image()
      .encode('x', 'name')
      .encode('y', 0)
      .encode('src', (d) => d.icon)
      .encode('size', 12)
      .style('transform', 'translateX(10)'),
  );

chart.render();
