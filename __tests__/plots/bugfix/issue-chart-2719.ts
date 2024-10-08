import { Chart } from '../../../src';

export function issueChart2719(context) {
  const { container, canvas } = context;
  const chart = new Chart({
    container: container,
    canvas,
  });

  chart.options({
    type: 'interval',
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
    },
    encode: {
      x: '月份',
      y: '月均降雨量',
      color: 'name',
    },
    transform: [
      {
        type: 'dodgeX',
        padding: 0,
      },
    ],
    interaction: {
      tooltip: {
        shared: true,
      },
    },
  });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
