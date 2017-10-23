/**
 * @fileOverview the base class of Coordinate
 * @author sima.zhang
 */
const Util = require('../util');
const MatrixUtil = require('@antv/g').MatrixUtil;
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

  getCenter() {
    return this.center;
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

  /**
   * 将归一化的坐标点数据转换为画布坐标
   * @override
   * @param  {Object} point 归一化的坐标点
   * @return {Object}       返回画布坐标
   */
  convertPoint(point) {
    return point;
  }

  /**
   * 将画布坐标转换为归一化的坐标点数据
   * @override
   * @param  {Object} point 画布坐标点数据
   * @return {Object}       归一化后的数据点
   */
  invertPoint(point) {
    return point;
  }

  /**
   * 将坐标点进行矩阵变换
   * @param  {Number} x   对应 x 轴画布坐标
   * @param  {Number} y   对应 y 轴画布坐标
   * @param  {Number} tag 默认为 0，可取值 0, 1
   * @return {Array}     返回变换后的三阶向量 [x, y, z]
   */
  applyMatrix(x, y, tag = 0) {
    const matrix = this.matrix;
    const vector = [ x, y, tag ];
    vec3.transformMat3(vector, vector, matrix);
    return vector;
  }

  /**
   * 将坐标点进行矩阵逆变换
   * @param  {Number} x   对应 x 轴画布坐标
   * @param  {Number} y   对应 y 轴画布坐标
   * @param  {Number} tag 默认为 0，可取值 0, 1
   * @return {Array}     返回矩阵逆变换后的三阶向量 [x, y, z]
   */
  invertMatrix(x, y, tag = 0) {
    const matrix = this.matrix;
    const inversedMatrix = mat3.invert([], matrix);
    const vector = [ x, y, tag ];
    vec3.transformMat3(vector, vector, inversedMatrix);
    return vector;
  }

  /**
   * 将归一化的坐标点数据转换为画布坐标，并根据坐标系当前矩阵进行变换
   * @param  {Object} point 归一化的坐标点
   * @return {Object}       返回进行矩阵变换后的画布坐标
   */
  convert(point) {
    const { x, y } = this.convertPoint(point);
    const vector = this.applyMatrix(x, y, 1);
    return {
      x: vector[0],
      y: vector[1]
    };
  }

  /**
   * 将进行过矩阵变换画布坐标转换为归一化坐标
   * @param  {Object} point 画布坐标
   * @return {Object}       返回归一化的坐标点
   */
  invert(point) {
    const vector = this.invertMatrix(point.x, point.y, 1);
    return this.invertPoint({
      x: vector[0],
      y: vector[1]
    });
  }

  /**
   * 坐标系旋转变换
   * @param  {Number} radian 旋转弧度
   * @return {Object}        返回坐标系对象
   */
  rotate(radian) {
    const matrix = this.matrix;
    const center = this.center;
    mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
    mat3.rotate(matrix, matrix, radian);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);
    return this;
  }

  /**
   * 坐标系反射变换
   * @param  {String} dim 反射维度
   * @return {Object}     返回坐标系对象
   */
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

  /**
   * 坐标系比例变换
   * @param  {Number} s1 x 方向缩放比例
   * @param  {Number} s2 y 方向缩放比例
   * @return {Object}    返回坐标系对象
   */
  scale(s1, s2) {
    const matrix = this.matrix;
    const center = this.center;
    mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
    mat3.scale(matrix, matrix, [ s1, s2 ]);
    mat3.translate(matrix, matrix, [ center.x, center.y ]);
    return this;
  }

  /**
   * 坐标系平移变换
   * @param  {Number} x x 方向平移像素
   * @param  {Number} y y 方向平移像素
   * @return {Object}   返回坐标系对象
   */
  translate(x, y) {
    const matrix = this.matrix;
    mat3.translate(matrix, matrix, [ x, y ]);
    return this;
  }

  /**
   * 将坐标系 x y 两个轴进行转置
   * @return {Object} 返回坐标系对象
   */
  transpose() {
    this.isTransposed = !this.isTransposed;
    return this;
  }
}

module.exports = Coord;
