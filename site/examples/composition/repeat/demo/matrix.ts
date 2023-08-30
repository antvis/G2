/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/interactive_splom.html
 */
import { Chart } from '@antv/g2';

const toNaN = (d) => (d === 'NaN' ? NaN : d);

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 800,
  paddingLeft: 70,
  paddingBottom: 70,
});

const repeatMatrix = chart
  .repeatMatrix()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/penguins.json',
    transform: [
      {
        type: 'map',
        callback: ({
          culmen_depth_mm: cdepth,
          culmen_length_mm: clength,
          flipper_length_mm: flength,
          body_mass_g: bmass,
          ...d
        }) => ({
          ...d,
          culmen_depth_mm: toNaN(cdepth),
          culmen_length_mm: toNaN(clength),
          flipper_length_mm: toNaN(flength),
          body_mass_g: toNaN(bmass),
        }),
      },
    ],
  })
  .encode('position', [
    'culmen_length_mm',
    'culmen_depth_mm',
    'flipper_length_mm',
    'body_mass_g',
  ]);

repeatMatrix.point().encode('color', 'species');

chart.render();
