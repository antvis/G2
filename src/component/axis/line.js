const Base = require('./base');
const Util = require('../../util');
const
var Matrix = require('@ali/g-matrix');
var Vector2 = Matrix.Vector2;
var MMath = require('@ali/g-math');

function Axis(cfg) {
  Axis.superclass.constructor.call(this, cfg);
}

Axis.CFG = {
  zIndex: 4, // @type {Number} Z 轴位置
  x: null, // @type {Number} 距离初始位置的x轴偏移量,仅对于左侧、右侧的纵向坐标有效
  y: null, // @type {Number} 距离初始位置的y轴偏移量，仅对顶部、底部的横向坐标轴有效
  elCls: CLS_AXIS, // @type {String} 附加的样式
  line: { // @type {Attrs} 坐标轴线的图形属性,如果设置成null，则不显示轴线
    lineWidth: 1,
    stroke: '#C0D0E0'
  },
  tickLine: { // @type {Attrs} 标注坐标线的图形属性
    lineWidth: 1,
    stroke: '#C0D0E0',
    value: 5
  },
  isVertical: false,
  start: null, // @type {Object} 起点
  end: null // @type {Object} 终点
};

Util.extend(Axis, Abstract);

Util.augment(Axis, {
  _getAvgLabelLength: function(labelsGroup) {
    var labels = labelsGroup.get('children');
    return labels[1].attr('x') - labels[0].attr('x');
  },
  // 获取偏移位置的向量
  getSideVector: function(offset) {
    var self = this;
    var factor = self.get('factor');
    var isVertical = self.get('isVertical');
    var start = self.get('start');
    var end = self.get('end');
    var axisVector = self.getAxisVector();
    var normal = axisVector.normalize(); // 转换成单位向量
    var direction = false;
    if ((isVertical && (start.y < end.y)) || (!isVertical && (start.x > end.x))) {
      direction = true;
    }
    var verticalVector = normal.vertical(direction);
    return verticalVector.multiplyScaler(offset * factor);
  },
  getAxisVector: function() {
    var start = this.get('start');
    var end = this.get('end');
    return new Vector2(end.x - start.x, end.y - start.y);
  },
  /**
   * @protected
   * 获取坐标轴的path
   * @return {String|Array} path
   */
  getLinePath: function() {
    var self = this;
    var start = self.get('start');
    var end = self.get('end');
    var path = [];
    path.push(['M', start.x, start.y]);
    path.push(['L', end.x, end.y]);
    return path;
  },
  getTickEnd: function(start, value) {
    var self = this;
    var lineAttrs = self.get('tickLine');
    var offsetVector;
    value = value ? value : lineAttrs.value;
    offsetVector = self.getSideVector(value);
    return {
      x: start.x + offsetVector.x,
      y: start.y + offsetVector.y
    };
  },
  // 获取坐标轴上的节点位置
  getTickPoint: function(tickValue) {
    var self = this;
    var start = self.get('start');
    var end = self.get('end');
    var rangeX = end.x - start.x;
    var rangeY = end.y - start.y;
    return {
      x: start.x + rangeX * tickValue,
      y: start.y + rangeY * tickValue
    };
  },
  // 渲染标题
  renderTitle: function() {
    var self = this;
    var title = self.get('title');
    var offsetPoint = self.getTickPoint(0.5);
    var titleOffset = self.get('titleOffset');
    var labelsGroup = self.get('labelsGroup');
    if (labelsGroup) {
      var labelLength = self.getMaxLabelWidth(labelsGroup);
      var labelOffset = self.get('labelOffset') || 10;
      if ((labelLength + labelOffset + 20) < titleOffset) {
        titleOffset = (labelLength + labelOffset + 20);
      }
    }
    var cfg = Util.mix({}, title);
    if (title.text) {
      var sideVector = self.getSideVector(titleOffset);
      var point = {
        x: offsetPoint.x + sideVector.x,
        y: offsetPoint.y + sideVector.y
      };

      var vector = self.getAxisVector(); // 坐标轴方向的向量
      var angle = 0;
      if (!MMath.equal(vector.y, 0)) { // 所有水平坐标轴，文本不转置
        var v1 = new Vector2(1, 0);
        var v2 = new Vector2(vector.x, vector.y);
        angle = v2.angleTo(v1, true);
      }

      cfg.rotate = angle * (180 / Math.PI); //* -1;
      cfg.x = point.x; // + (title.x || 0);
      cfg.y = point.y; // + (title.y || 0);
      self.addShape('Text', {
        elCls: CLS_AXIS + '-title',
        attrs: cfg
      });
    }
  },
  autoRotateLabels: function() {
    var self = this;
    var labelsGroup = self.get('labelsGroup');
    var title = self.get('title');
    if (labelsGroup) {
      var offset = self.get('labelOffset') || 10;
      var append = offset;
      var titleOffset = self.get('titleOffset');
      var vector = self.getAxisVector(); // 坐标轴的向量，仅处理水平或者垂直的场景
      var angle;
      var maxWidth;
      if (MMath.equal(vector.x, 0) && title && title.text) { // 坐标轴垂直，由于不知道边距，只能防止跟title重合，如果title不存在，则不自动旋转
        maxWidth = self.getMaxLabelWidth(labelsGroup);
        if ((maxWidth + offset) > (titleOffset - append)) {
          angle = Math.acos((titleOffset - append) / (maxWidth + offset)) * -1;
        }
      } else if (MMath.equal(vector.y, 0) && labelsGroup.getCount() > 1) { // 坐标轴水平，不考虑边距，根据最长的和平均值进行翻转
        var avgWidth = Math.abs(self._getAvgLabelLength(labelsGroup)); // Math.abs(vector.x) / (self.get('ticks').length - 1);,平均计算存在问题，分类坐标轴的点前后有空白
        maxWidth = self.getMaxLabelWidth(labelsGroup);
        if (maxWidth > avgWidth) {
          angle = Math.atan2(offset * 1.5, avgWidth);
        }
      }

      if (angle) {
        var factor = self.get('factor');
        Util.each(labelsGroup.get('children'), function(label) {
          label.rotateAtStart(angle);
          if (MMath.equal(vector.y, 0)) {
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
});

module.exports = Axis;
