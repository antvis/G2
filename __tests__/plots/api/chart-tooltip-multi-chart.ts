import { Chart } from '../../../src';

export function chartTooltipMultiChart(context) {
  const { container, canvas1, canvas2 } = context;

  const options = {
    type: 'interval',
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
    },
    interaction: { tooltip: { mount: 'body' } },
  };

  // View0
  const view0Container = document.createElement('div');
  container.appendChild(view0Container);

  const view0 = new Chart({
    container: view0Container,
    canvas: canvas1,
  });

  view0.options(options);

  const finished0 = view0.render();

  // View1.
  const view1Container = document.createElement('div');
  container.appendChild(view1Container);

  const view1 = new Chart({
    container: view1Container,
    canvas: canvas2,
  });

  view1.options(options);

  const finished1 = view1.render();

  return { finished0, finished1 };
}
