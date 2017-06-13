const Util = require('../util');
const MatrixUtil = require('@ali/g').MatrixUtil;
const mat3 = MatrixUtil.mat3;
const vec3 = MatrixUtil.vec3;

class Coord {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    return {
      /**
       * Mark x y is transposed.
       * @type {Boolean}
       */
      isTransposed: false,
      /**
       * The matrix of coordinate
       * @type {Array}
       */
      matrix: [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }

  init() {
    const start = this.start;
    const end = this.end;
    const center = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2
    };

    this.center = center;
    this.width = Math.abs(end.x - start.x);
    this.height = Math.abs(end.y - start.y);
  }

  _swapDim(dim) {
    const dimRange = this[dim];
    if (dimRange) {
      const tmp = dimRange.start;
      dimRange.start = dimRange.end;
      dimRange.end = tmp;
    }
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  convertDim(percent, dim) {
    const { start, end } = this[dim];
    return start + percent * (end - start);
  }

  invertDim(value, dim) {
    const { start, end } = this[dim];
    return (value - start) / (end - start);
  }

  // @override
  convertPoint(point) {
    return point;
  }
  // @override
  invertPoint(point) {
    return point;
  }

  trans(x, y, tag = 0) {
    const matrix = this.matrix;
    const vector = [ x, y, tag ];
    vec3.transformMat3(vector, vector, matrix);
    return vector;
  }

  reverse(x, y, tag = 0) {
    const matrix = this.matrix;
    const inversedMatrix = mat3.invert([], matrix);
    const vector = [ x, y, tag ];
    vec3.transformMat3(vector, vector, inversedMatrix);
    return vector;
  }

  convert(point) {
    const { x, y } = this.convertPoint(point);
    const vector = this.trans(x, y, 1);
    return {
      x: vector[0],
      y: vector[1]
    };
  }

  invert(point) {
    const vector = this.reverse(point.x, point.y, 1);
    return this.invertPoint({
      x: vector[0],
      y: vector[1]
    });
  }

  rotate(radian) {
    const matrix = this.matrix;
    const center = this.center;
    mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
    mat3.rotate(matrix, matrix, radian);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);
    return this;
  }

  reflect(dim) {
    switch (dim) {
      case 'x':
        this._swapDim('x');
        break;
      case 'y':
        this._swapDim('y');
        break;
      default:
        this._swapDim('y');
    }
    return this;
  }

  scale(s1, s2) {
    const matrix = this.matrix;
    const center = this.center;
    mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
    mat3.scale(matrix, matrix, [ s1, s2 ]);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);
    return this;
  }

  translate(x, y) {
    const matrix = this.matrix;
    mat3.translate(matrix, matrix, [ x, y ]);
    return this;
  }

  transpose() {
    this.isTransposed = !this.isTransposed;
  }
}

module.exports = Coord;
