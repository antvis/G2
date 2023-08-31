/**
 * A recreation of this demo: https://g2plot.antv.antgroup.com/examples/plugin/pattern/#heatmap-cookie-pattern
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 550,
  height: 500,
  paddingBottom: 80,
});

function applyStyle(ctx, style) {
  return Object.entries(style).forEach(([k, v]) => (ctx[k] = v));
}

function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  canvas.getContext('2d').scale(dpr, dpr);

  return canvas;
}

function drawRect(ctx, w, h, fill) {
  applyStyle(ctx, { fillStyle: fill });
  ctx.fillRect(0, 0, w, h);
}

function drawLinePattern(ctx, color, width, height, cross = false) {
  applyStyle(ctx, { globalAlpha: 1, strokeStyle: color, strokeOpacity: 0.9 });
  applyStyle(ctx, { lineWidth: 0.5, lineCap: 'square' });

  const d = `
       M 0 ${-height} L ${width * 2} ${height}
       M ${-width} ${-height} L ${width} ${height}
       M ${-width} 0 L ${width} ${height * 2}`;
  ctx.stroke(new Path2D(d));

  if (cross) {
    const d1 = `
         M ${-width} ${height} L ${width} ${-height}
         M ${-width} ${height * 2} L ${width * 2} ${-height}
         M 0 ${height * 2} L ${width * 2} 0`;
    ctx.stroke(new Path2D(d1));
  }
}

// create pattern with raw Canvas API
const createPattern = (color, stroke, cross = false, density = false) => {
  const spacing = density ? 3 : 5;
  const width = Math.abs(spacing / Math.sin(Math.PI / 4));
  const height = spacing / Math.sin(Math.PI / 4);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  drawRect(ctx, width, height, color);
  drawLinePattern(ctx, stroke, width, height, cross);

  return canvas;
};

const pattern1 = createPattern('#edaa53', '#44120c', true, true);
const pattern2 = createPattern('#edaa53', '#44120c', true);
const pattern3 = createPattern('#edaa53', '#fff');

chart
  .cell()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json',
  })
  .encode('x', 'name')
  .encode('y', 'country')
  .encode('color', '#edaa53')
  .style('radius', Infinity)
  .style('inset', 1)
  .style('shadowBlur', 10)
  .style('shadowColor', 'rgba(0,0,0,0.3)')
  .style('fill', ({ value }) => {
    return {
      image:
        60 <= value && value < 90
          ? pattern1
          : value >= 50
          ? pattern2
          : pattern3,
      repetition: 'repeat',
    };
  })
  .animate('enter', { type: 'fadeIn' });

chart.render();
