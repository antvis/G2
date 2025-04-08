import { Canvas, CustomEvent } from '@antv/g';
import { randomUniform, randomLcg } from '@antv/vendor/d3-random';
import { Chart } from '../../../src';

export async function issue6747(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({
    container,
    canvas,
  });

  const random = randomUniform.source(randomLcg(42))(0, 1);

  chart.options({
    type: 'wordCloud',
    layout: {
      padding: 4,
      spiral: 'rectangular',
      random,
    },
    data: {
      type: 'fetch',
      value: 'data/philosophyWord.json',
    },
    encode: {
      color: 'text',
    },
  });

  await chart.render();

  const { document } = chart.getContext().canvas as Canvas;
  const items = document.getElementsByClassName('items-item');
  // Cancel 10-20 items's selection.
  items.slice(10, 20).forEach((item) => {
    item.dispatchEvent(new CustomEvent('click', {}));
  });

  chart.on('element:click', (e) => {
    console.log(e.data.data.text);
  });

  const item0Text = items[0].getAttribute('labelText');
  const elements = document.getElementsByClassName('element');
  const element0 = elements.find((e) => e.getAttribute('text') === item0Text);
  element0?.dispatchEvent(new CustomEvent('click', { bubbles: true }));

  return {
    chart,
    finished: Promise.resolve(),
  };
}
