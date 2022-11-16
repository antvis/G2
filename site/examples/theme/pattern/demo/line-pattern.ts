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
  .style('radius', 4)
  .style('stroke', '#fff')
  .style('lineWidth', 4)
  .style('fill', (d, idx) => ({
    image: drawPattern(idx),
    repetition: 'repeat',
  }))
  .legend(false);

chart.render();

// === Draw pattern ===
const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

const drawPattern = (idx) => {
  const patternCanvas = document.createElement('canvas');
  const color = colors[(idx + colors.length) % colors.length];
  const w = Math.abs(8 / Math.sin(Math.PI / 4));
  const h = 8 / Math.sin(Math.PI / 4);
  patternCanvas.width = w;
  patternCanvas.height = h;
  patternCanvas.style.width = `${w / 2}px`;
  patternCanvas.style.height = `${h / 2}px`;

  const ctx = patternCanvas.getContext('2d');
  const applyStyle = (style) =>
    Object.entries(style).forEach(([k, v]) => (ctx[k] = v));

  applyStyle({ globalAlpha: 0.65, fillStyle: color });
  ctx.beginPath();
  ctx.fillRect(0, 0, w, h);
  ctx.fill();

  applyStyle({ globalAlpha: 1, strokeStyle: color });
  applyStyle({ lineWidth: 3, lineCap: 'square' });
  const lineTo = (x0, y0, x1, y1) => (ctx.moveTo(x0, y0), ctx.lineTo(x1, y1));
  lineTo(0, -h, w * 2, h);
  lineTo(-w, -h, w, h);
  lineTo(-w, 0, w, h * 2);
  ctx.stroke();

  return patternCanvas;
};
