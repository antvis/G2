import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 550,
  height: 500,
  paddingBottom: 80,
});

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
  .style('radius', '50%')
  .style('inset', 1)
  .style('shadowBlur', 10)
  .style('shadowColor', 'rgba(0,0,0,0.3)')
  .style('fill', ({ value }) => {
    const pattern1 = drawPattern('#edaa53', '#44120c', true, true);
    const pattern2 = drawPattern('#edaa53', '#44120c', true);
    const pattern3 = drawPattern('#edaa53', '#fff');
    return {
      image:
        60 <= value && value < 90
          ? pattern1
          : value >= 50
          ? pattern2
          : pattern3,
      repetition: 'repeat',
    };
  });

chart.render();

// === Draw pattern ===
function applyStyle(ctx, style) {
  return Object.entries(style).forEach(([k, v]) => (ctx[k] = v));
}

function drawRectangle(ctx, w, h, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, w, h);
}

function drawLinePattern(ctx, color, w, h, cross = false) {
  applyStyle(ctx, { globalAlpha: 1, strokeStyle: color });
  applyStyle(ctx, { lineWidth: 1, lineCap: 'square' });
  const lineTo = (x0, y0, x1, y1) => (ctx.moveTo(x0, y0), ctx.lineTo(x1, y1));
  lineTo(0, -h, w * 2, h);
  lineTo(-w, -h, w, h);
  lineTo(-w, 0, w, h * 2);
  if (cross) {
    lineTo(w * 2, -h, 0, h);
    lineTo(w, -h, -w, h);
    lineTo(w, 0, -w, h * 2);
  }
  ctx.stroke();
}

const drawPattern = (fill, stroke, cross = false, density = false) => {
  const patternCanvas = document.createElement('canvas');
  const size = density ? 5 : 10;
  const w = Math.abs(size / Math.sin(Math.PI / 4));
  const h = size / Math.sin(Math.PI / 4);
  patternCanvas.width = w;
  patternCanvas.height = h;
  patternCanvas.style.width = `${w / 2}px`;
  patternCanvas.style.height = `${h / 2}px`;

  const ctx = patternCanvas.getContext('2d');

  drawRectangle(ctx, w, h, fill);
  drawLinePattern(ctx, stroke, w, h, cross);

  return patternCanvas;
};
