import { schemeTableau10 } from 'd3-scale-chromatic';
import { Chart } from '../../../src';
import flareTreemap from '../../data/flare-treemap.json';

export function issue6551(context) {
  const { container, canvas } = context;
  const chart = new Chart({
    container: container,
    canvas,
  });

  chart
    .treemap()
    .data(flareTreemap)
    .layout({
      path: (d) => d.name.replace(/\./g, '/'),
      tile: 'treemapBinary',
      paddingInner: 1,
    })
    .encode('value', 'size')
    .scale('color', { range: schemeTableau10 })
    .style(
      'labelText',
      (d) =>
        d.data.name
          .split('.')
          .pop()
          .split(/(?=[A-Z][a-z])/g)[0],
    )
    .style('labelFill', '#000')
    .style('labelPosition', 'top-left')
    .style('fillOpacity', 0.5);

  chart
    .interaction('tooltip', {
      css: {
        '.g2-tooltip': {
          'background-color': 'rgba(0, 0, 0, 0.50)',
          'border-radius': ' 2px !important',
          'box-shadow': '0px 10px 20px 0px rgba(0, 0, 0, 0.50) !important',
        },
        '.g2-tooltip-title': {
          'border-bottom': '0.5px solid #0F445B',
          color: '#fff',
        },
        '.g2-tooltip-list-item-name-label': {
          color: '#fff',
          'font-size': '10px',
        },
        '.g2-tooltip-list-item-value': {
          color: '#fff',
          'font-size': '10px',
        },
      },
    })
    .interaction({
      treemapDrillDown: {
        breadCrumbY: 12,
        activeFill: '#ff0000',
        breadCrumbFill: '#fff',
      },
    });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
