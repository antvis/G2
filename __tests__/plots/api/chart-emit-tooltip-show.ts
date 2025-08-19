import { CustomEvent } from '@antv/g';
import { Chart } from '../../../src';

export function chartEmitTooltipShow(context) {
  const { container, canvas } = context;

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  // p
  const p = document.createElement('p');
  p.innerText = '';
  p.className = 'tooltip-content';
  container.appendChild(p);

  const chart = new Chart({
    container: wrapperDiv,
    canvas,
  });

  chart
    .line()
    .data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ])
    .encode('x', 'year')
    .encode('y', 'value');

  const finished = chart.render();

  finished.then((chart) => {
    const { canvas: C } = chart.getContext();
    const { document } = C as any;
    const element = document.getElementsByClassName('plot')[0];
    element.dispatchEvent(
      new CustomEvent('pointermove', { offsetX: 500, offsetY: 300 }),
    );
  });

  chart.on('tooltip:show', ({ data }) => {
    p.innerText = JSON.stringify(data);
  });

  return {
    chart,
    finished,
  };
}
