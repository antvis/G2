/**
 * A recreation of this demo: https://nivo.rocks/pie/
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 500,
  height: 400,
  paddingLeft: 50,
});

chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });

chart
  .interval()
  .data([
    { id: 'c', value: 526 },
    { id: 'sass', value: 220 },
    { id: 'php', value: 325 },
    { id: 'elixir', value: 561 },
    { id: 'rust', value: 54 },
  ])
  .transform({ type: 'stackY' })
  .encode('y', 'value')
  .label({
    text: 'id',
    position: 'outside',
    fontWeight: 'bold',
  })
  .style('radius', 6)
  .style('stroke', '#fff')
  .style('lineWidth', 4)
  .style('fill', (_, idx) => ({
    image: drawPattern(idx),
    repetition: 'repeat',
  }))
  .legend(false);

chart.render();

// === Draw pattern ===
const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

function applyStyle(ctx, style) {
  return Object.entries(style).forEach(([k, v]) => (ctx[k] = v));
}

const createCanvas = (w, h) => {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return canvas;
};

function drawRect(ctx, w, h, color) {
  applyStyle(ctx, { globalAlpha: 0.65, fillStyle: color });
  ctx.fillRect(0, 0, w, h);
}

function drawLine(ctx, d, color) {
  applyStyle(ctx, { globalAlpha: 1, strokeStyle: color });
  applyStyle(ctx, { lineWidth: 2, lineCap: 'square' });

  ctx.stroke(new Path2D(d));
}

const drawPattern = (idx) => {
  const spacing = 5;
  const width = Math.abs(spacing / Math.sin(Math.PI / 4));
  const height = spacing / Math.sin(Math.PI / 4);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const d = `
    M 0 ${-height} L ${width * 2} ${height}
    M ${-width} ${-height} L ${width} ${height}
    M ${-width} 0 L ${width} ${height * 2}`;

  const color = colors[(idx + colors.length) % colors.length];
  drawRect(ctx, width, height, color);
  drawLine(ctx, d, color);

  return canvas;
};
