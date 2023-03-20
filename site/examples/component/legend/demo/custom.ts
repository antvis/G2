import { Chart } from '@antv/g2';

const chart = new Chart({
  theme: 'classic',
  container: 'container',
});

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .legend(false); // Hide built-in legends.

chart.render().then(renderCustomLegend);

function renderCustomLegend(chart) {
  // Get color scale.
  const scale = chart.getScaleByChannel('color');
  const { domain, range } = scale.getOptions();
  const excludedValues = [];

  // Create items from scale domain.
  const items = domain.map((text, i) => {
    const span = document.createElement('span');
    const color = range[i];

    // Items' style.
    span.innerText = text;
    span.style.display = 'inline-block';
    span.style.padding = '0.5em';
    span.style.color = color;
    span.style.cursor = 'pointer';

    span.onclick = () => {
      const index = excludedValues.findIndex((d) => d === text);
      if (index === -1) {
        excludedValues.push(text);
        span.style.color = '#aaa';
      } else {
        excludedValues.splice(index, 1);
        span.style.color = color;
      }
      onChange(excludedValues);
    };

    return span;
  });

  // Mount legend items.
  const container = document.getElementById('container');
  const canvas = container.getElementsByTagName('canvas')[0];
  const legend = document.createElement('legend');
  container.insertBefore(legend, canvas);
  for (const item of items) legend.append(item);

  // Emit legendFilter event.
  function onChange(values: any[]) {
    const selectedValues = domain.filter((d) => !values.includes(d));
    chart.emit('legend:filter', {
      channel: 'color',
      values: selectedValues,
    });
  }
}
