import { Chart } from '../../../src';
import { profit } from '../../data/profit';

export function chartEmitLegendHighlight(context) {
  const { container, canvas } = context;

  // button
  const button = document.createElement('button');
  button.innerText = 'highlight';
  container.appendChild(button);

  const button1 = document.createElement('button');
  button1.innerText = 'reset';
  container.appendChild(button1);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart.options({
    type: 'interval',
    data: profit,
    axis: { y: { labelFormatter: '~s' } },
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
    state: { inactive: { opacity: 0.5 } },
    legend: {
      color: { state: { inactive: { labelOpacity: 0.5, markerOpacity: 0.5 } } },
    },
    interaction: {
      legendHighlight: true,
      tooltip: false,
    },
  });

  chart.on('legend:highlight', (e) => {
    const { nativeEvent, data } = e;
    if (!nativeEvent) return;
    console.log(data);
  });

  chart.on('legend:unhighlight', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    console.log('unhighlight');
  });

  button.onclick = () => {
    chart.emit('legend:highlight', {
      data: { channel: 'color', value: 'Increase' },
    });
  };

  button1.onclick = () => {
    chart.emit('legend:unhighlight', {});
  };

  const finished = chart.render();

  return { chart, finished };
}
