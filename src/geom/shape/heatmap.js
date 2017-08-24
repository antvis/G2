/**
 * @fileOverview heatmap shapes
 * @author leungwensen@gmail.com
 */
const Shape = require('./shape');

const Heatmap = Shape.registerFactory('heatmap', {
  defaultShapeType: 'circle'
});

function drawGrayScaleBlurred(x, y, r, blur, alpha, ctx) {
  const grad = ctx.createRadialGradient(x, y, blur, x, y, r);
  grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.globalAlpha = alpha;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

Shape.registerShape('heatmap', 'circle', {
  draw(cfg, container) {
    const style = cfg.style || {
      radius: 30,
      blur: 10
    };
    const { radius, blur } = style;
    drawGrayScaleBlurred(cfg.x, cfg.y, radius, blur, cfg.alpha, cfg.ctx);
    const shape = container.addShape('Circle', {
      attrs: {
        x: cfg.x,
        y: cfg.y,
        r: radius
      }
    });
    return shape;
  }
});

module.exports = Heatmap;
