/**
 * @fileOverview the line guide
 * @author sima.zhang
 */
const Util = require('../../util');
const Base = require('./base');
const { vec2 } = require('@antv/g').MatrixUtil;

class Line extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 辅助元素类型
       * @type {String}
       */
      type: 'line',
      /**
       * 辅助线的起点位置
       * @type {Object | Function | Array}
       */
      start: null,
      /**
       * 辅助线的终点位置
       * @type {Object | Function | Array}
       */
      end: null,
      /**
       * 辅助线的图形样式
       * @type {Object}
       */
      lineStyle: {
        stroke: '#000',
        lineWidth: 1
      },
      /**
       * 辅助文本配置
       * @type {Object}
       */
      text: {
        position: 'end', // 文本的显示位置： start / center / end / 百分比
        autoRotate: true, // 文本是否沿着辅助线的方向自动旋转
        style: {
          fill: '#999',
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'sans-serif'
        }, // 辅助文本的样式
        content: null // 辅助文本的文字
      }
    });
  }

  render(coord, group) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const guideLineGroup = group.addGroup();

    self._drawLines(start, end, guideLineGroup);
    if (this.text && this.text.content) {
      self._drawText(start, end, guideLineGroup);
    }
    self.el = guideLineGroup;
  }

  _drawLines(start, end, group) {
    const path = [
      [ 'M', start.x, start.y ],
      [ 'L', end.x, end.y ]
    ];
    const guideLine = group.addShape('Path', {
      attrs: Util.mix({
        path
      }, this.lineStyle)
    });
    guideLine.name = 'guide-line';
    this.appendInfo && guideLine.setSilent('appendInfo', this.appendInfo);
  }

  _drawText(start, end, group) {
    const textCfg = this.text;
    const position = textCfg.position;
    const textStyle = textCfg.style;

    let percent;
    if (position === 'start') {
      percent = 0;
    } else if (position === 'center') {
      percent = 0.5;
    } else if (Util.isString(position) && position.indexOf('%') !== -1) {
      percent = parseInt(position, 10) / 100;
    } else if (Util.isNumber(position)) {
      percent = position;
    } else {
      percent = 1;
    }

    if (percent > 1 || percent < 0) {
      percent = 1;
    }

    let cfg = {
      x: start.x + (end.x - start.x) * percent,
      y: start.y + (end.y - start.y) * percent
    };

    if (textCfg.offsetX) { // 设置了偏移量
      cfg.x += textCfg.offsetX;
    }

    if (textCfg.offsetY) { // 设置了偏移量
      cfg.y += textCfg.offsetY;
    }

    cfg.text = textCfg.content;
    cfg = Util.mix({}, cfg, textStyle);
    if (textCfg.autoRotate && Util.isNil(textStyle.rotate)) { // 自动旋转且用户没有设置旋转角度
      const angle = vec2.angleTo([ end.x - start.x, end.y - start.y ], [ 1, 0 ], 1);
      cfg.rotate = angle;
    } else if (!Util.isNil(textStyle.rotate)) { // 用户设置了旋转角度
      cfg.rotate = (textStyle.rotate * Math.PI) / 180;
    }

    const shape = group.addShape('Text', {
      attrs: cfg
    });
    shape.name = 'guide-line-text';
    this.appendInfo && shape.setSilent('appendInfo', this.appendInfo);
  }
}

module.exports = Line;
