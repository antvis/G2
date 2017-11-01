/**
 * @fileOverview the base class of Axis
 * @author sima.zhang
 */
const Util = require('../../util');
const { LabelsRenderer } = require('../label/index');
const { Group } = require('@antv/g');
const Grid = require('./grid');
const Global = require('../../global');

class Base extends Group {
  getDefaultCfg() {
    return {
      /**
       * Ψһ��ʶ�����ڶ���
       * @type {[type]}
       */
      _id: null,
      zIndex: 4,
      /**
       * �������ϵ������
       * @type {Array}
       */
      ticks: null,
      /**
       * �������ߵ�ͼ���������ã�������ó�null������ʾ
       * @type {Object}
       */
      line: null,
      /**
       * �̶��ߵ���ʽ���ã�������ó�null������ʾ
       * @type {Object}
       */
      tickLine: null,
      /**
       * �ο̶��߸��������δ���ø����ԣ�����ʾ
       * @type {Number}
       */
      subTickCount: 0,
      /**
       * �ο̶�����ʽ����
       * @type {Object}
       */
      subTickLine: null,
      /**
       * ������դ������ʽ���ã��������Ϊ null������ʾ
       * @type {Object}
       */
      grid: null,
      /**
       * �������ϵ��ı��������
       * @type {Object}
       */
      label: {
        textStyle: {}, // �ı���ʽ����
        autoRotate: true,
        formatter: null//  ��ʽ���������ı���ʾ
      },
      /**
       * �����������ʽ����
       * @type {Object}
       */
      title: {
        autoRotate: true, // �Զ���ת
        textStyle: {} // �����ı���ʽ����
      },
      autoPaint: true // @type {Boolean} �Ƿ��Զ�����
    };
  }

  _beforeRenderUI() {
    // ���Ĭ����ʽ
    const title = this.get('title');
    const label = this.get('label');
    const grid = this.get('grid');
    const textStyle = {
      fontSize: 12,
      fill: '#ccc',
      textBaseline: 'middle',
      fontFamily: Global.fontFamily
    };
    if (title) {
      this.setSilent('title', Util.deepMix({
        autoRotate: true,
        textStyle,
        offset: 48
      }, title));
    }
    if (label) {
      this.setSilent('label', Util.deepMix({
        autoRotate: true,
        textStyle,
        offset: 10
      }, label));
    }
    if (grid) {
      this.setSilent('grid', Util.deepMix({
        lineStyle: {
          lineWidth: 1,
          stroke: '#C0D0E0'
        }
      }, grid));
    }
  }

  _renderUI() {
    const labelCfg = this.get('label');
    if (labelCfg) {
      this.renderLabels();
    }
    if (this.get('autoPaint')) {
      this.paint();
    }
    if (!Util.isNil(this.get('title'))) {
      this.renderTitle();
    }
    this.sort();
  }

  _parseTicks(ticks) {
    ticks = ticks || [];
    const ticksLength = ticks.length;
    for (let i = 0; i < ticksLength; i++) {
      const item = ticks[i];
      if (!Util.isObject(item)) {
        ticks[i] = this.parseTick(item, i, ticksLength);
      }
    }
    this.set('ticks', ticks);
    return ticks;
  }

  _addTickItem(index, point, length, type = '') {
    let tickItems = this.get('tickItems');
    let subTickItems = this.get('subTickItems');
    const end = this.getTickEnd(point, length, index);

    const cfg = {
      x1: point.x,
      y1: point.y,
      x2: end.x,
      y2: end.y
    };

    if (!tickItems) {
      tickItems = [];
    }

    if (!subTickItems) {
      subTickItems = [];
    }

    if (type === 'sub') {
      subTickItems.push(cfg);
    } else {
      tickItems.push(cfg);
    }

    this.set('tickItems', tickItems);
    this.set('subTickItems', subTickItems);
  }

  _renderLine() {
    let lineCfg = this.get('line');
    let path;
    if (lineCfg) {
      path = this.getLinePath();
      lineCfg = Util.mix({
        path
      }, lineCfg);
      const lineShape = this.addShape('path', {
        attrs: lineCfg
      });
      lineShape.name = 'axis-line';
      this.set('lineShape', lineShape);
    }
  }

  _processTicks() {
    const self = this;
    const labelCfg = self.get('label');
    const subTickCount = self.get('subTickCount');
    const tickLineCfg = self.get('tickLine');
    let ticks = self.get('ticks');
    ticks = self._parseTicks(ticks);

    Util.each(ticks, function(tick, index) {
      const tickPoint = self.getTickPoint(tick.value, index);
      if (tickLineCfg) {
        self._addTickItem(index, tickPoint, tickLineCfg.length);
      }
      if (labelCfg) {
        self.addLabel(tick, tickPoint, index);
      }
    });

    if (subTickCount) { // ��������ôμ��ֵ㣬��Ӵμ�tick
      const subTickLineCfg = self.get('subTickLine');
      Util.each(ticks, function(tick, index) {
        if (index > 0) {
          let diff = tick.value - ticks[index - 1].value;
          diff = diff / (self.get('subTickCount') + 1);

          for (let i = 1; i <= subTickCount; i++) {
            const subTick = {
              text: '',
              value: index ? ticks[index - 1].value + i * diff : i * diff
            };

            const tickPoint = self.getTickPoint(subTick.value);
            let subTickLength;
            if (subTickLineCfg && subTickLineCfg.length) {
              subTickLength = subTickLineCfg.length;
            } else {
              subTickLength = parseInt(tickLineCfg.length * (3 / 5), 10);
            }
            self._addTickItem(i - 1, tickPoint, subTickLength, 'sub');
          }
        }
      });
    }
  }

  _addTickLine(ticks, lineCfg) {
    const self = this;
    const cfg = Util.mix({}, lineCfg);
    const path = [];
    Util.each(ticks, function(item) {
      path.push([ 'M', item.x1, item.y1 ]);
      path.push([ 'L', item.x2, item.y2 ]);
    });
    delete cfg.length;
    cfg.path = path;
    const tickShape = self.addShape('path', {
      attrs: cfg
    });
    tickShape.name = 'axis-ticks';
    tickShape._id = this.get('_id') + '-ticks'; // ÿ�� label �� _id Ψһ��ʶ
    tickShape.set('coord', this.get('coord'));
  }

  _renderTicks() {
    const self = this;
    const tickItems = self.get('tickItems');
    const subTickItems = self.get('subTickItems');

    if (!Util.isEmpty(tickItems)) {
      const tickLineCfg = self.get('tickLine');
      self._addTickLine(tickItems, tickLineCfg);
    }

    if (!Util.isEmpty(subTickItems)) {
      const subTickLineCfg = self.get('subTickLine') || self.get('tickLine');
      self._addTickLine(subTickItems, subTickLineCfg);
    }
  }

  _renderGrid() {
    const grid = this.get('grid');
    if (!grid) {
      return;
    }
    grid.coord = this.get('coord');
    this.set('gridGroup', this.addGroup(Grid, grid));
  }

  paint() {
    this._renderLine();
    this._processTicks();
    this._renderTicks();
    this._renderGrid();
    const labelCfg = this.get('label');
    if (labelCfg && labelCfg.autoRotate) {
      this.autoRotateLabels();
    }
  }

  parseTick(tick, index, length) {
    return {
      text: tick,
      value: index / (length - 1)
    };
  }

  getTextAnchor(vector) {
    const ratio = Math.abs(vector[1] / vector[0]);
    let align;
    if (ratio >= 1) { // �����������
      align = 'center';
    } else {
      if (vector[0] > 0) { // �Ҳ�
        align = 'start';
      } else { // ���
        align = 'end';
      }
    }
    return align;
  }

  getMaxLabelWidth(labelsGroup) {
    const labels = labelsGroup.get('children');
    let max = 0;
    Util.each(labels, function(label) {
      const bbox = label.getBBox();
      const width = bbox.width;
      if (max < width) {
        max = width;
      }
    });
    return max;
  }

  remove() {
    super.remove();
    const gridGroup = this.get('gridGroup');
    gridGroup && gridGroup.remove();
    this.removeLabels();
  }

  /**
   * ��ת�ı�
   * @abstract
   * @return {[type]} [description]
   */
  autoRotateLabels() {}

  /**
   * ��Ⱦ���������
   * @abstract
   * @return {[type]} [description]
   */
  renderTitle() {}

  /**
   * ��ȡ�������ߵ� path
   * @abstract
   * @return {[type]} [description]
   */
  getLinePath() {}

  /**
   * ��ȡtick�ڻ����ϵ�λ��
   * @abstract
   * @return {[type]} [description]
   */
  getTickPoint() {}

  /**
   * ��ȡ��ʾ�������ߵ��յ�
   * @abstract
   * @return {[type]} [description]
   */
  getTickEnd() {}

  /**
   * ��ȡ���������������
   * @abstract
   * @return {[type]} [description]
   */
  getSideVector() {}
}

Util.assign(Base.prototype, LabelsRenderer, {
  addLabel(tick, point, index) {
    const labelsGroup = this.get('labelsGroup');
    const label = {};
    let rst;

    if (labelsGroup) {
      const offset = this.get('label').offset || this.get('_labelOffset');
      const vector = this.getSideVector(offset, point, index);
      point = {
        x: point.x + vector[0],
        y: point.y + vector[1]
      };

      label.text = tick.text;
      label.x = point.x;
      label.y = point.y;
      label.textAlign = this.getTextAnchor(vector);
      rst = labelsGroup.addLabel(label);
      if (rst) {
        rst.name = 'axis-label';
        rst._id = this.get('_id') + '-' + tick.tickValue; // ÿ�� label �� _id Ψһ��ʶ
        rst.set('coord', this.get('coord'));
      }
    }
    return rst;
  }
});

module.exports = Base;
