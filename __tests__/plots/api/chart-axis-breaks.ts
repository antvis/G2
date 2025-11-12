import { Chart } from '../../../src';

export function chartAxisBreaks(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.width = '800px';
  wrapperDiv.style.height = '500px';
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    autoFit: true,
    canvas,
  });

  const axisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data1 = [1800, 2500, 3100, 4200, 3890, 5200, 5600];
  const data2 = [950, 1400, 2200, 1750, 2800, 3300, 2900];
  const data3 = [101200, 104800, 102600, 103500, 104200, 102900, 103800];
  const data4 = [4120500, 4107800, 4112300, 4109500, 4115000, 4111200, 4108800];

  const data = axisData.flatMap((name, i) => [
    { name, value: data1[i], type: 'Sports' },
    { name, value: data2[i], type: 'Strategy' },
    { name, value: data3[i], type: 'Shooter' },
    { name, value: data4[i], type: 'Other' },
  ]);

  chart.data(data);

  chart
    .interval()
    .encode('x', 'name')
    .encode('y', 'value')
    .transform({ type: 'dodgeX' })
    .encode('color', 'type')
    .interaction('tooltip', { shared: true })
    .scale('y', { nice: true })
    .axis('x', { title: false })
    .axis('y', {
      title: false,
      labelAutoHide: false,
      transform: [],
      breaks: [
        {
          start: 6000,
          end: 100000,
          gap: '3%',
        },
        {
          start: 105000,
          end: 4100000,
          gap: '3%',
          vertices: 60,
          verticeOffset: 4,
          compress: 'end',
        },
      ],
    });

  const finished = chart.render();

  return { chart, finished };
}
