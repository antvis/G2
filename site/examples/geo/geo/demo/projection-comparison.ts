/**
 * A recreation of this demo: https://observablehq.com/@d3/projection-comparison
 */
import { Chart } from '@antv/g2';
import { feature } from 'topojson';
import { geoPolyconic, geoRectangularPolyconic } from 'd3-geo-projection';

fetch('https://assets.antv.antgroup.com/g2/countries-50m.json')
  .then((res) => res.json())
  .then((world) => {
    const land = feature(world, world.objects.land).features;

    const worldMap = (node, projection, color, opacity = 0.7) => {
      const geoView = node.geoView().projection({
        type: projection,
        size: 'fitWidth',
      });

      geoView
        .geoPath()
        .data(land)
        .style('fill', color)
        .style('opacity', opacity);

      geoView
        .geoPath()
        .data({ type: 'graticule10' })
        .style('fill', 'none')
        .style('stroke', color)
        .style('strokeOpacity', 0.3);

      geoView
        .geoPath()
        .data({ type: 'sphere' })
        .style('fill', 'none')
        .style('stroke', color);
    };

    const chart = new Chart({
      container: 'container',
      autoFit: true,
    });

    const layer = chart.spaceLayer();

    layer
      .call(worldMap, geoPolyconic, '#f00')
      .call(worldMap, geoRectangularPolyconic, '#00f');

    chart.render();
  });
