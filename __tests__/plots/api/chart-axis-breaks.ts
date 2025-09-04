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
  const data1 = [1500, 2032, 2001, 3154, 2190, 4330, 6410];
  const data2 = [1200, 1320, 1010, 1340, 900, 2300, 2100];
  const data3 = [3106212, 3102118, 3102643, 3104631, 3106679, 3102300, 3104000];
  const data4 = [103200, 100320, 103010, 102340, 103900, 103300, 103200];

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
          start: 5000,
          end: 50000,
          gap: '3%',
        },
        {
          start: 105000,
          end: 3100000,
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
