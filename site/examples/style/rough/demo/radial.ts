import { Chart } from '@antv/g2';
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Gaegu'],
  },
  active: () => {
    const chart = new Chart({
      container: 'container',
      height: 480,
      plugins: [new Plugin()],
    });

    chart.coordinate({ type: 'theta' });

    chart
      .interval()
      .transform({ type: 'stackY' })
      .data({
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
      })
      .encode('y', 'value')
      .encode('color', 'name')
      .scale('color', {
        range: [
          'hachure',
          'solid',
          'zigzag',
          'cross-hatch',
          'dots',
          'dashed',
          'zigzag-line',
        ],
      })
      .style('fill', 'black')
      .style('stroke', 'black')
      .style('lineWidth', '4')
      .style('colorAttribute', 'fillStyle')
      .legend(false)
      .label({
        text: 'name',
        radius: 0.8,
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Gaegu',
        fill: 'black',
        stroke: 'white',
      })
      .label({
        text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
        radius: 0.8,
        fontSize: 12,
        fontFamily: 'Gaegu',
        fill: 'black',
        stroke: 'white',
        dy: 8,
      });

    chart.render();
  },
});
