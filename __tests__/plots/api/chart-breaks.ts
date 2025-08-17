import { Chart } from '../../../src';

export function chartBreaks(context) {
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

  const data = [
    { genre: 'Sports', sold: 200 },
    { genre: 'Strategy', sold: 400 },
    { genre: 'Action', sold: 950 },
    { genre: 'Shooter', sold: 510 },
    { genre: 'Other', sold: 850 },
  ];

  chart.data(data);

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre')
    .label({
      text: 'sold',
      position: 'inside',
      style: {
        fill: '#fff',
        fontSize: 16,
      },
    })
    .axis('y', {
      label: true,
      labelAutoHide: false,
      breaks: [
        {
          start: 200,
          end: 500,
        },
        {
          start: 600,
          end: 800,
          gap: 0.08,
          vertices: 60,
          verticeOffset: 4,
          stroke: 'red',
        },
      ],
    });

  const finished = chart.render();

  return { chart, finished };
}
