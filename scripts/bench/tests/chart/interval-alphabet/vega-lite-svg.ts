import vegaEmbed from 'vega-embed';
import type { Chart } from '../types';

export const vegaLiteSVG: Chart = (data, { start, end }) => {
  const options = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    data: {
      values: data,
    },
    width: 640,
    height: 480,
    mark: 'bar',
    encoding: {
      x: { field: 'letter', type: 'nominal' },
      y: { field: 'frequency', type: 'quantitative' },
      color: { value: 'steelblue' },
    },
  };
  start();
  const node = document.createElement('div');
  // @ts-ignore
  vegaEmbed(node, options).then(() => end(node));
};
