import { Chart } from '../../../src';

export function chartEmitLegendFilter(context) {
  const { container, canvas } = context;

  // button
  const legend = document.createElement('div');
  container.appendChild(legend);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    theme: 'classic',
    container: wrapperDiv,
    canvas,
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
    .animate(false)
    .legend(false);

  const finished = chart.render();
  const assetValues: any = {
    chart,
    finished,
  };

  finished.then(() => {
    const scale = chart.getScaleByChannel('color');
    const { domain, range } = scale.getOptions();
    const excludedValues: any[] = [];

    assetValues.items = domain.map((text, i) => {
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

    // Mount items.
    for (const item of assetValues.items) legend.append(item);

    function onChange(values: any[]) {
      const selectedValues = domain.filter((d) => !values.includes(d));

      // Emit Event.
      chart.emit('legend:filter', {
        channel: 'color',
        values: selectedValues,
      });
    }
  });

  return assetValues;
}
