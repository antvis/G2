import { Chart, PLOT_CLASS_NAME } from '../../../src';

export function issue6399(context) {
  const { container, canvas } = context;
  const box1 = document.createElement('div', {});
  const box2 = document.createElement('div', {});
  box1.id = 'box1';
  box2.style.height = '4000px';
  container.style.height = '100vh';
  container.style.overflow = 'auto';
  box2.append(box1);
  container.append(box2);
  const chart = new Chart({
    container: box1,
    canvas,
  });

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .axis('y', { title: '↑ Change in price (%)' })
    .interaction('tooltip', {
      mount: 'body',
      crosshairsXStroke: 'red',
      crosshairsYStroke: 'blue',
    })
    .tooltip({
      title: (d) => new Date(d.Date).toUTCString(),
      items: [
        (d, i, data, column) => ({
          name: 'Close',
          value: column.y.value[i!].toFixed(1),
        }),
      ],
    })
    .label({
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    });

  setTimeout(() => {
    container.scrollTo(0, 400);
  }, 100);

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
