import { Chart } from '../../../src';

export function issue6659(context) {
  const { container, canvas } = context;
  const chart = new Chart({ container, canvas });
  // chart.options({
  //   type: 'interval',
  //   autoFit: true,
  //   data: {
  //     type: 'fetch',
  //     value:
  //       'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  //   },
  //   encode: { x: 'letter', y: 'frequency' },
  //   axis: { y: { labelFormatter: '.0%' } },
  //   interaction: {
  //     elementSelect: {
  //       // single: true,
  //       region: true,
  //     },
  //   },
  // });

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    transform: [
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    legend: false,
    interaction: {
      tooltip: {
        // shared: true,
        mount: 'body',
        css: {
          '.g2-tooltip': {
            background: '#eee',
            'border-radius': ' 0.25em !important',
          },
          '.g2-tooltip-title': {
            'font-size': '20px',
            'font-weight': 'bold',
            'padding-bottom': '0.25em',
          },
          '.g2-tooltip-list-item': {
            background: '#ccc',
            padding: '0.25em',
            margin: '0.25em',
            'border-radius': '0.25em',
          },
          '.g2-tooltip-list-item-name-label': {
            'font-weight': 'bold',
            'font-size': '16px',
          },
          'g2-tooltip-list-item-marker': {
            'border-radius': '0.25em',
            width: '15px',
            height: '15px',
          },
          '.g2-tooltip-list-item-value': {
            'font-weight': 'bold',
            'font-size': '16px',
          },
        },
      },
      elementSelect: {
        region: true,
      },
    },
  });

  // chart.options({
  //   type: 'interval',
  //   autoFit: true,
  //   data: [
  //     { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  //     { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  //     { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  //     { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
  //     { name: 'London', 月份: 'May', 月均降雨量: 47 },
  //     { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
  //     { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
  //     { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
  //     { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  //     { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  //     { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  //     { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
  //     { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
  //     { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
  //     { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
  //     { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  //   ],
  //   encode: { x: '月份', y: '月均降雨量', color: 'name' },
  //   transform: [{ type: 'dodgeX' }],

  //   interaction: {
  //     elementSelect: {
  //       // single: true,
  //       region: true,
  //     },

  //     tooltip: {
  //       shared: true,
  //       mount: 'body',
  //       css: {
  //         '.g2-tooltip': {
  //           background: '#eee',
  //           'border-radius': ' 0.25em !important',
  //         },
  //         '.g2-tooltip-title': {
  //           'font-size': '20px',
  //           'font-weight': 'bold',
  //           'padding-bottom': '0.25em',
  //         },
  //         '.g2-tooltip-list-item': {
  //           background: '#ccc',
  //           padding: '0.25em',
  //           margin: '0.25em',
  //           'border-radius': '0.25em',
  //         },
  //         '.g2-tooltip-list-item-name-label': {
  //           'font-weight': 'bold',
  //           'font-size': '16px',
  //         },
  //         'g2-tooltip-list-item-marker': {
  //           'border-radius': '0.25em',
  //           width: '15px',
  //           height: '15px',
  //         },
  //         '.g2-tooltip-list-item-value': {
  //           'font-weight': 'bold',
  //           'font-size': '16px',
  //         },
  //       },
  //     },
  //   },
  // });

  chart.render();

  return {
    chart,
  };
}
