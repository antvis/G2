import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 244,
  height: 244,
});

chart.options({
  type: 'view',
  data: [
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
  ],
  coordinate: { type: 'radial', innerRadius: 0.2 },
  children: [
    {
      type: 'interval',
      encode: {
        x: 'name',
        y: 1,
        size: 52,
        color: 'color',
      },
      scale: {
        color: { type: 'identity' },
      },
      style: {
        fillOpacity: 0.25,
      },
      animate: false,
    },
    {
      type: 'interval',
      encode: {
        x: 'name',
        y: 'percent',
        color: 'color',
        size: 52,
      },
      style: {
        radius: 26,
        shadowColor: 'rgba(0,0,0,0.45)',
        shadowBlur: 20,
        shadowOffsetX: -2,
        shadowOffsetY: -5,
      },
      axis: false,
      animate: {
        enter: {
          type: 'waveIn',
          easing: 'easing-out-bounce',
          duration: 1000,
        },
      },
    },
    {
      type: 'image',
      encode: {
        x: 'name',
        y: 0,
        src: (d) => d.icon,
        size: 12,
      },
      style: {
        transform: 'translateX(10)',
      },
    },
  ],
});

chart.render();
