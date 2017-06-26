const Util = require('../../util');

class PlotRange {
  constructor(start, end) {
    this.reset(start, end);
  }

  init() {
    const start = this.start;
    const end = this.end;
    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxY = Math.max(start.y, end.y);

    this.tl = {
      x: minX,
      y: minY
    }; // top-left

    this.tr = {
      x: maxX,
      y: minY
    }; // top-right

    this.bl = {
      x: minX,
      y: maxY
    }; // bottom-left

    this.br = {
      x: maxX,
      y: maxY
    }; // bottom-right

    this.cc = {
      x: (this.br.x - this.tl.x) / 2 + this.tl.x,
      y: (this.br.y - this.tl.y) / 2 + this.tl.y
    };
  }

  reset(start, end) {
    this.start = start;
    this.end = end;
    this.init();
  }

  /**
   * 是否在范围内
   * @param {Number} x x坐标
   * @param {Number} y y坐标
   * @return {Boolean}   是否在范围内
   */
  isInRange(x, y) {
    if (Util.isObject(x)) {
      y = x.y;
      x = x.x;
    }
    const tl = this.tl;
    const br = this.br;

    return x >= tl.x && x <= br.x && y >= tl.y && y <= br.y;
  }
  /**
   * 是否在垂直范围内
   * @param  {Number}  y y坐标
   * @return {Boolean} 在垂直范围内
   */
  isInVertical(y) {
    if (Util.isObject(y)) {
      y = y.y;
    }

    const tl = this.tl;
    const br = this.br;

    return y >= tl.y && y <= br.y;
  }
  /**
   * 是否在水平范围内
   * @param  {Number}  x x坐标
   * @return {Boolean}  是否在水平范围内
   */
  isInHorizontal(x) {
    if (Util.isObject(x)) {
      x = x.x;
    }

    const tl = this.tl;
    const br = this.br;

    return x >= tl.x && x <= br.x;
  }
  /**
   * 获取宽度
   * @return {Number} 宽度
   */
  getWidth() {
    const tl = this.tl;
    const br = this.br;
    return br.x - tl.x;
  }
  /**
   * 获取高度
   * @return {Number} 高度
   */
  getHeight() {
    const tl = this.tl;
    const br = this.br;
    return br.y - tl.y;
  }
}

module.exports = PlotRange;
