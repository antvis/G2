const { Group, PathUtil } = require('@ali/g');
const Util = require('../../util');

class Grid extends Group {
  getDefaultCfg() {
    return {
      zIndex: 1,
      /**
       * 栅格线的类型
       *  - line 不封闭的线
       *  - polygon 封闭的多边形
       * @type {String}
       */
      type: 'line',
      /**
       * 线的样式配置
       * @type {Object}
       */
      lineStyle: null,
      /**
       * 线集合的配置
       * @type {Array}
       */
      items: null,
      /**
       * 为网格设置交替的背景色，指定一个值则先渲染奇数层，两个值则交替渲染
       * @type {String | Array}
       */
      alternateColor: null,
      matrix: null,
      /**
       * 是否绘制平滑线，用于地理坐标轴
       * @type {[type]}
       */
      smooth: null
    };
  }

  _renderUI() {
    super._renderUI();
    this._drawLines();
  }

  _drawLines() {
    const self = this;
    const lineStyle = self.get('lineStyle');
    const items = self.get('items');
    if (items && items.length) {
      self._precessItems(items);
      self._drawGridLines(items, lineStyle);
    }
  }

  _precessItems(items) {
    const self = this;
    let preItem;
    Util.each(items, function(item, index) {
      if (preItem && self.get('alternateColor')) {
        self._drawAlternativeBg(item, preItem, index);
      }

      preItem = item;
    });
  }

  _drawGridLines(items, lineStyle) {
    const self = this;
    const type = this.get('type');
    const smooth = this.get('smooth'); // 用于绘制地理投影的坐标轴网格线
    let gridLine;
    let points;
    let path;
    let cfg;
    const start = this.get('start');

    if (type === 'line' || type === 'polygon') {
      Util.each(items, function(item) {
        // TODO: 是否可以通过设置标识符规避这个判断
        if (start && start.x === item[0].x && item[0].y === start.y) {
          return;
        }
        if (smooth) { // 平缓处理
          points = [];
          Util.each(item, function(subItem) {
            points.push(subItem.x);
            points.push(subItem.y);
          });
          path = PathUtil.catmullRomToBezier(points);
          path.unshift([ 'M', item[0].x, item[0].y ]);
        } else {
          path = [];
          Util.each(item, function(subItem, index) {
            if (index === 0) {
              path.push([ 'M', subItem.x, subItem.y ]);
            } else {
              path.push([ 'L', subItem.x, subItem.y ]);
            }
          });
        }
        cfg = Util.mix({}, lineStyle, {
          path
        });
        gridLine = self.addShape('path', {
          attrs: cfg
        });
        gridLine.name = 'axis-grid';
        self.set('gridLine', gridLine);
      });
    } else {
      Util.each(items, function(item) {
        // TODO: 是否可以通过设置标识符规避这个判断
        if (start && start.x === item[0].x && item[0].y === start.y) {
          return;
        }
        path = [];
        Util.each(item, function(subItem, index) {
          const radius = subItem.radius;
          if (index === 0) {
            path.push([ 'M', subItem.x, subItem.y ]);
          } else {
            path.push([ 'A', radius, radius, 0, 0, subItem.flag, subItem.x, subItem.y ]);
          }
        });
        cfg = Util.mix({}, lineStyle, {
          path
        });
        gridLine = self.addShape('path', {
          attrs: cfg
        });
        gridLine.name = 'axis-grid';
        self.set('gridLine', gridLine);
      });
    }
  }

  _drawAlternativeBg(item, preItem, index) {
    const self = this;
    const alternateColor = self.get('alternateColor');
    let attrs;
    let oddColor;
    let evenColor;

    if (Util.isString(alternateColor)) {
      oddColor = alternateColor;
    } else if (Util.isArray(alternateColor)) {
      oddColor = alternateColor[0];
      evenColor = alternateColor[1];
    }

    if (index % 2 === 0) {
      if (evenColor) {
        attrs = self._getBackItem(preItem, item, evenColor);
      }
    } else if (oddColor) {
      attrs = self._getBackItem(preItem, item, oddColor);
    }

    self.addShape('Path', {
      attrs
    });
  }

  _getBackItem(start, end, bgColor) {
    const path = [];
    const type = this.get('type');

    if (type === 'line' || type === 'polygon') {
      Util.each(start, function(subItem, index) {
        if (index === 0) {
          path.push([ 'M', subItem.x, subItem.y ]);
        } else {
          path.push([ 'L', subItem.x, subItem.y ]);
        }
      });
      for (let i = end.length - 1; i >= 0; i--) {
        path.push([ 'L', end[i].x, end[i].y ]);
      }
      path.push([ 'Z' ]);
    } else {
      const flag = start[0].flag;
      Util.each(start, function(subItem, index) {
        const radius = subItem.radius;
        if (index === 0) {
          path.push([ 'M', subItem.x, subItem.y ]);
        } else {
          path.push([ 'A', radius, radius, 0, 0, subItem.flag, subItem.x, subItem.y ]);
        }
      });
      for (let j = end.length - 1; j >= 0; j--) {
        const endSubItem = end[j];
        const endRadius = endSubItem.radius;
        if (j === end.length - 1) {
          path.push([ 'M', endSubItem.x, endSubItem.y ]);
        } else {
          path.push([ 'A', endRadius, endRadius, 0, 0, flag === 1 ? 0 : 1, endSubItem.x, endSubItem.y ]);
        }
      }
    }

    return {
      fill: bgColor,
      path
    };
  }
}

module.exports = Grid;
