/**
 * @fileOverview the radius axis of polar coordinate and axis of cartesian coordinate
 * @author sima.zhang
 */
const Base = require('./base');
const Util = require('../../util');
const { MatrixUtil } = require('@antv/g');
const vec2 = MatrixUtil.vec2;

class Line extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      x: null, // @type {Number} 距离初始位置的x轴偏移量,仅对于左侧、右侧的纵向坐标有效
      y: null, // @type {Number} 距离初始位置的y轴偏移量，仅对顶部、底部的横向坐标轴有效
      line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
        lineWidth: 1,
        stroke: '#C0D0E0'
      },
      tickLine: { // @type {Attrs} 标注坐标线的图形属性
        lineWidth: 1,
        stroke: '#C0D0E0',
        length: 5
      },
      isVertical: false,
      start: null, // @type {Object} 起点
      end: null // @type {Object} 终点
    });
  }

  _getAvgLabelLength(labelsGroup) {
    const labels = labelsGroup.get('children');
    return labels[1].attr('x') - labels[0].attr('x');
  }

  /**
   * 获取距离坐标轴的向量
   * @override
   * @param  {Number} offset 偏移值
   * @return {Array}        返回二维向量
   */
  getSideVector(offset) {
    const self = this;
    const factor = self.get('factor');
    const isVertical = self.get('isVertical');
    const start = self.get('start');
    const end = self.get('end');
    const axisVector = self.getAxisVector();
    const normal = vec2.normalize([], axisVector);
    let direction = false;
    if ((isVertical && (start.y < end.y)) || (!isVertical && (start.x > end.x))) {
      direction = true;
    }
    const verticalVector = vec2.vertical([], normal, direction);
    return vec2.scale([], verticalVector, offset * factor);
  }

  getAxisVector() {
    const start = this.get('start');
    const end = this.get('end');
    return [ end.x - start.x, end.y - start.y ];
  }

  getLinePath() {
    const self = this;
    const start = self.get('start');
    const end = self.get('end');
    const path = [];
    path.push([ 'M', start.x, start.y ]);
    path.push([ 'L', end.x, end.y ]);
    return path;
  }

  getTickEnd(start, value) {
    const self = this;
    const offsetVector = self.getSideVector(value);
    return {
      x: start.x + offsetVector[0],
      y: start.y + offsetVector[1]
    };
  }

  getTickPoint(tickValue) {
    const self = this;
    const start = self.get('start');
    const end = self.get('end');
    const rangeX = end.x - start.x;
    const rangeY = end.y - start.y;
    return {
      x: start.x + rangeX * tickValue,
      y: start.y + rangeY * tickValue
    };
  }

  renderTitle() {
    const self = this;
    const title = self.get('title');
    const offsetPoint = self.getTickPoint(0.5);
    let titleOffset = title.offset;
    if (Util.isNil(titleOffset)) { // 没有指定 offset 则自动计算
      titleOffset = 20;
      const labelsGroup = self.get('labelsGroup');
      if (labelsGroup) {
        const labelLength = self.getMaxLabelWidth(labelsGroup);
        const labelOffset = self.get('label').offset || self.get('_labelOffset');
        titleOffset += labelLength + labelOffset;
      }
    }

    const textStyle = title.textStyle;
    const cfg = Util.mix({}, textStyle);
    if (title.text) {
      const vector = self.getAxisVector(); // 坐标轴方向的向量
      if (title.autoRotate && Util.isNil(textStyle.rotate)) { // 自动旋转并且用户没有指定标题的旋转角度
        let angle = 0;
        if (!Util.snapEqual(vector[1], 0)) { // 所有水平坐标轴，文本不转置
          const v1 = [ 1, 0 ];
          const v2 = [ vector[0], vector[1] ];
          angle = vec2.angleTo(v2, v1, true);
        }

        cfg.rotate = angle * (180 / Math.PI);
      } else if (!Util.isNil(textStyle.rotate)) { // 用户设置了旋转角度就以用户设置的为准
        cfg.rotate = (textStyle.rotate / 180) * Math.PI; // 将角度转换为弧度
      }

      const sideVector = self.getSideVector(titleOffset);
      let point;
      const position = title.position;
      if (position === 'start') {
        point = {
          x: this.get('start').x + sideVector[0],
          y: this.get('start').y + sideVector[1]
        };
      } else if (position === 'end') {
        point = {
          x: this.get('end').x + sideVector[0],
          y: this.get('end').y + sideVector[1]
        };
      } else {
        point = {
          x: offsetPoint.x + sideVector[0],
          y: offsetPoint.y + sideVector[1]
        };
      }

      cfg.x = point.x;
      cfg.y = point.y;
      cfg.text = title.text;

      const titleShape = self.addShape('Text', {
        zIndex: 2,
        attrs: cfg
      });
      titleShape.name = 'axis-title';
      self.get('appendInfo') && titleShape.setSilent('appendInfo', self.get('appendInfo'));
    }
  }

  autoRotateLabels() {
    const self = this;
    const labelsGroup = self.get('labelsGroup');
    const title = self.get('title');
    if (labelsGroup) {
      const offset = self.get('label').offset;
      const append = 12;
      const titleOffset = title ? title.offset : 48;
      if (titleOffset < 0) { // 如果是负的的话就不旋转
        return;
      }
      const vector = self.getAxisVector(); // 坐标轴的向量，仅处理水平或者垂直的场景
      let angle;
      let maxWidth;
      if (Util.snapEqual(vector[0], 0) && title && title.text) { // 坐标轴垂直，由于不知道边距，只能防止跟title重合，如果title不存在，则不自动旋转
        maxWidth = self.getMaxLabelWidth(labelsGroup);
        if ((maxWidth) > (titleOffset - offset - append)) {
          angle = Math.acos((titleOffset - offset - append) / (maxWidth)) * -1;
        }
      } else if (Util.snapEqual(vector[1], 0) && labelsGroup.getCount() > 1) { // 坐标轴水平，不考虑边距，根据最长的和平均值进行翻转
        const avgWidth = Math.abs(self._getAvgLabelLength(labelsGroup));
        maxWidth = self.getMaxLabelWidth(labelsGroup);
        if (maxWidth > avgWidth) {
          angle = Math.asin((titleOffset - offset - append) * 1.25 / (maxWidth));
        }
      }

      if (angle) {
        const factor = self.get('factor');
        Util.each(labelsGroup.get('children'), function(label) {
          label.rotateAtStart(angle);
          if (Util.snapEqual(vector[1], 0)) {
            if (factor > 0) {
              label.attr('textAlign', 'left');
            } else {
              label.attr('textAlign', 'right');
            }
          }
        });
      }
    }
  }
}

module.exports = Line;
