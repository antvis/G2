import { Chart } from '@antv/g2';

const SIZE = 256;

const chart = new Chart({
  container: 'container',
  width: SIZE,
  height: SIZE,
});

const FLAG_TEMPLATE = [
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*FpxcQI7WEusAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rx6ST7V6cA0AAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7rKcTJiP1rMAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_GUISa64kgYAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Wwy8TJAoCeUAAAAAAAAAAAAADmJ7AQ/original',
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DphFRIpOYWQAAAAAAAAAAAAADmJ7AQ/original',
];

// 换成你自己的，可以使用远程 CDN 地址，也可以使用 Base64 编码
const MY_PHOTO =
  'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vYY6RrxEWKwAAAAAAAAAAAAADmJ7AQ/original';

chart.options({
  type: 'view',
  children: [
    {
      type: 'image',
      data: [{ x: 0.5, y: 0.5 }],
      encode: {
        x: 'x',
        y: 'y',
        src: MY_PHOTO,
        size: SIZE,
      },
      axis: false,
      tooltip: false,
    },
    {
      type: 'image',
      data: [{ x: 0.5, y: 0.5 }],
      encode: {
        x: 'x',
        y: 'y',
        src: () =>
          FLAG_TEMPLATE[Math.floor(Math.random() * FLAG_TEMPLATE.length)],
        size: SIZE,
      },
      axis: false,
      tooltip: false,
    },
  ],
});

chart.render();
