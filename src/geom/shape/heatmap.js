/**
 * @fileOverview heatmap shapes
 * @author leungwensen@gmail.com
 */
const Shape = require('./shape');
const Util = require('../../util');

const Heatmap = Shape.registerFactory('heatmap', {
  defaultShapeType: 'circle'
});

const DEFAULT_SIZE = {
  blur: 1,
  radius: 30
};

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
    let size = cfg.size || cfg.radius || DEFAULT_SIZE;
    if (Util.isNumber(size)) {
      size = Util.assign({}, DEFAULT_SIZE, {
        radius: size
      });
    }
    const { radius, blur } = size;
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
