import { Chart } from '@antv/g2';

const FW = 600;
const FH = 400;
const P = 50;

const chart = new Chart({
  container: 'container',
  width: FW + P * 2,
  height: FH + P * 2,
  padding: P,
});

// Draw football field.
chart.shape().style('x', '0%').style('y', '0%').style('render', football);

// Analysis messi's shoot data.
chart
  .rect()
  .data({
    type: 'fetch',
    value:
      'https://mdn.alipayobjects.com/afts/file/A*FCRjT4NGENEAAAAAAAAAAAAADrd2AQ/messi.json',
  })
  .transform({
    type: 'bin',
    opacity: 'count',
    thresholdsX: 15,
    thresholdsY: 15,
  })
  .encode('x', (d) => Number(d.X))
  .encode('y', (d) => Number(d.Y))
  .scale('x', { domain: [0, 1] })
  .scale('y', { domain: [0, 1] })
  .axis(false)
  .legend(false);

chart.render();

/**
 * Draw a football field.
 */
function football(_, context) {
  const { document } = context;

  const g = document.createElement('g');
  const r = document.createElement('rect', {
    style: {
      x: 0,
      y: 0,
      width: FW,
      height: FH,
      fill: 'green',
      fillOpacity: 0.2,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const r1 = document.createElement('rect', {
    style: {
      x: FW - FH * 0.6 * 0.45,
      y: (FH - FH * 0.6) / 2,
      width: FH * 0.6 * 0.45,
      height: FH * 0.6,
      strokeOpacity: 0.5,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const r2 = document.createElement('rect', {
    style: {
      x: FW - FH * 0.3 * 0.45,
      y: (FH - FH * 0.3) / 2,
      width: FH * 0.3 * 0.45,
      height: FH * 0.3,
      strokeOpacity: 0.5,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const l = document.createElement('line', {
    style: {
      x1: FW / 2,
      y1: 0,
      x2: FW / 2,
      y2: FH,
      strokeOpacity: 0.4,
      stroke: 'grey',
      lineWidth: 2,
    },
  });

  g.append(r);
  g.append(r1);
  g.append(r2);
  g.append(l);

  return g;
}
