/**
 * @fileOverview the grid of axis
 * @author sima.zhang
 */
const { Group } = require('@antv/g');
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
       * 是否隐藏第一条网格线，默认为 false
       * @type {Boolean}
       */
      hideFirstLine: false,
      /**
       * 是否隐藏最后一条网格线，默认为 false
       * @type {Boolean}
       */
      hideLastLine: false,
      /**
       * 0基线不在轴线上时，是否强调0基线
       * @type {Boolean}
       */
      hightLightZero: true,
      /**
       * 0基线样式
       * @type {Object}
       */
      zeroLineStyle: { stroke: '#000', lineDash: [ 0, 0 ] }
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

    let gridLine;
    let path;
    let cfg;
    let points;
    const itemsLength = items.length;

    if (type === 'line' || type === 'polygon') {
      Util.each(items, (item, idx) => {
        if (self.get('hideFirstLine') && idx === 0) { // 不展示第一条网格线
          return;
        }
        if (self.get('hideLastLine') && idx === (itemsLength - 1)) { // 不展示最后一条网格线
          return;
        }

        points = item.points;
        path = [];
        if (type === 'line') {
          path.push([ 'M', points[0].x, points[0].y ]);
          path.push([ 'L', points[ points.length - 1 ].x, points[ points.length - 1 ].y ]);
        } else {
          Util.each(points, function(point, index) {
            if (index === 0) {
              path.push([ 'M', point.x, point.y ]);
            } else {
              path.push([ 'L', point.x, point.y ]);
            }
          });
        }

        if (self._drawZeroLine(type, idx)) {
          cfg = Util.mix({}, self.get('zeroLineStyle'), {
            path
          });
        } else {
          cfg = Util.mix({}, lineStyle, {
            path
          });
        }

        gridLine = self.addShape('path', {
          attrs: cfg
        });
        gridLine.name = 'axis-grid';
        gridLine._id = item._id;
        gridLine.set('coord', self.get('coord'));
        self.get('appendInfo') && gridLine.setSilent('appendInfo', self.get('appendInfo'));
      });
    } else {
      Util.each(items, (item, idx) => {
        if (self.get('hideFirstLine') && idx === 0) { // 不展示第一条网格线
          return;
        }
        if (self.get('hideLastLine') && idx === (itemsLength - 1)) { // 不展示最后一条网格线
          return;
        }

        points = item.points;
        path = [];
        Util.each(points, function(point, index) {
          const radius = point.radius;
          if (index === 0) {
            path.push([ 'M', point.x, point.y ]);
          } else {
            path.push([ 'A', radius, radius, 0, 0, point.flag, point.x, point.y ]);
          }
        });
        cfg = Util.mix({}, lineStyle, {
          path
        });
        gridLine = self.addShape('path', {
          attrs: cfg
        });
        gridLine.name = 'axis-grid';
        gridLine._id = item._id;
        gridLine.set('coord', self.get('coord'));
        self.get('appendInfo') && gridLine.setSilent('appendInfo', self.get('appendInfo'));
      });
    }
  }

  _drawZeroLine(type, idx) {
    const self = this;
    const tickValues = self.get('tickValues');
    if (type === 'line' && tickValues) {
      if (tickValues[idx] === 0 && self.get('hightLightZero')) {
        return true;
      }
    }
    return false;
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
        attrs = self._getBackItem(preItem.points, item.points, evenColor);
      }
    } else if (oddColor) {
      attrs = self._getBackItem(preItem.points, item.points, oddColor);
    }

    const shape = self.addShape('Path', {
      attrs
    });
    shape.name = 'axis-grid-rect';
    shape._id = item._id && item._id.replace('grid', 'grid-rect');
    shape.set('coord', self.get('coord'));
    self.get('appendInfo') && shape.setSilent('appendInfo', self.get('appendInfo'));
  }

  _getBackItem(start, end, bgColor) {
    const path = [];
    const type = this.get('type');

    if (type === 'line') {
      path.push([ 'M', start[0].x, start[0].y ]);
      path.push([ 'L', start[start.length - 1].x, start[start.length - 1].y ]);
      path.push([ 'L', end[end.length - 1].x, end[end.length - 1].y ]);
      path.push([ 'L', end[0].x, end[0].y ]);
      path.push([ 'Z' ]);
    } else if (type === 'polygon') {
      Util.each(start, (subItem, index) => {
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
