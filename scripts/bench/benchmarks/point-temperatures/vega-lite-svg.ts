import vegaEmbed from 'vega-embed';

export function vegaLiteSVG(data, hooks) {
  const { start, end } = hooks;
  const options = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart with embedded data.',
    data: {
      values: data,
    },
    width: 640,
    height: 480,
    mark: 'point',
    encoding: {
      x: { field: 'date', type: 'quantitative' },
      y: { field: 'value', type: 'quantitative' },
      color: { value: 'black' },
    },
  };
  start();
  const node = document.createElement('div');
  // @ts-ignore
  vegaEmbed(node, options).then(() => end(node));
}
