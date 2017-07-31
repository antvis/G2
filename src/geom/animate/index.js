const Util = require('../../util');
const Angle = require('./angle');
const Circle = require('./circle');
const ScaleX = require('./scale-x');
const ScaleY = require('./scale-y');
// const Scale = require('./scale');
const WaveV = require('./wave-v');

function getAdjusts(adjusts) {
  const result = [];
  Util.each(adjusts, adjust => {
    result.push(Util.upperFirst(adjust.type));
  });

  return result;
}

module.exports = {
  getDefault(config) {
    const geom = config.geom; // 获取图形实例
    const fn = config.fn; // 绘制方法
    const coord = geom.get('coord'); // 获取坐标轴

    let C; // 动画构造函数
    let geomType = geom.get('type');
    let adjusts = geom.get('adjusts') || ''; // 防止为空
    if (adjusts) {
      adjusts = getAdjusts(adjusts);
    }
    geomType = geomType + adjusts.toString();
    switch (coord.type) {
      case 'cartesian':
        switch (geomType) {
          case 'interval':
          case 'intervalStack':
          case 'intervalDodge':
            if (coord.isTransposed) {
              C = ScaleX;
            } else {
              C = ScaleY;
            }
            break;
          case 'intervalSymmetric':
            C = ScaleY;
            break;
          default:
            C = WaveV;
            break;
        }
        break;
      case 'polar':
      case 'theta':
      case 'map':
        C = Angle; // angle;
        break;
      case 'helix':
        C = Circle;
        break;
      default:
        break;
    }

    const start = coord.start;
    const end = coord.end;
    const width = coord.getWidth();
    const height = coord.getHeight();
    const cfg = {
      group: geom.get('container'),
      rect: {
        x: start.x,
        y: end.y,
        width,
        height
      },
      before: fn
    };
    if (coord.isPolar) {
      Util.mix(cfg, {
        circle: {
          center: coord.getCenter(),
          startAngle: coord.startAngle,
          endAngle: coord.endAngle,
          r: (Math.max(width, height)) / 2
        }
      });
    }
    return new C(cfg);
  }
};
