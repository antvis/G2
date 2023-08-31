import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 244,
  height: 244,
});

chart
  .data([
    {
      name: 'activity1',
      percent: 0.6,
      color: '#1ad5de',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
    },
    {
      name: 'activity2',
      percent: 0.2,
      color: '#a0ff03',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
    },
    {
      name: 'activity3',
      percent: 0.3,
      color: '#e90b3a',
      icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
    },
  ])
  .coordinate({ type: 'radial', innerRadius: 0.2 });

chart
  .interval()
  .encode('x', 'name')
  .encode('y', 1)
  .encode('size', 52)
  .encode('color', 'color')
  .scale('color', { type: 'identity' })
  .style('fillOpacity', 0.25)
  .animate(false);

chart
  .interval()
  .encode('x', 'name')
  .encode('y', 'percent')
  .encode('color', 'color')
  .encode('size', 52)
  .style('radius', 26)
  .style('shadowColor', 'rgba(0,0,0,0.45)')
  .style('shadowBlur', 20)
  .style('shadowOffsetX', -2)
  .style('shadowOffsetY', -5)
  .axis(false)
  .animate('enter', {
    type: 'waveIn',
    easing: 'easing-out-bounce',
    duration: 1000,
  });

chart
  .image()
  .encode('x', 'name')
  .encode('y', 0)
  .encode('src', (d) => d.icon)
  .encode('size', 12)
  .style('transform', 'translateX(10)');

chart.render();
