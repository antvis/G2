const Util = require('../../util');
const G = require('../../renderer');

const { Group } = G;
const { DomUtil } = Util;
const OFFSET = 5;

const Range = function(cfg) {
  Range.superclass.constructor.call(this, cfg);
};

Util.extend(Range, Group);
Util.augment(Range, {
  getDefaultCfg() {
    return {
      /**
       * 范围
       * @type {Array}
       */
      range: null,
      /**
       * 中滑块属性
       * @type {ATTRS}
       */
      middleAttr: null,
      /**
       * 背景
       * @type {G-Element}
       */
      backgroundElement: null,
      /**
       * 下滑块
       * @type {G-Element}
       */
      minHandleElement: null,
      /**
       * 上滑块
       * @type {G-Element}
       */
      maxHandleElement: null,
      /**
       * 中块
       * @type {G-Element}
       */
      middleHandleElement: null,
      /**
       * 当前的激活的元素
       * @type {G-Element}
       */
      currentTarget: null,
      /**
       * 布局方式： horizontal，vertical
       * @type {String}
       */
      layout: 'vertical',
      /**
       * 宽
       * @type {Number}
       */
      width: null,
      /**
       * 高
       * @type {Number}
       */
      height: null,
      /**
       * 当前的PageX
       * @type {Number}
       */
      pageX: null,
      /**
       * 当前的PageY
       * @type {Number}
       */
      pageY: null
    };
  },

  _initHandle(type) {
    const self = this;
    const handle = self.addGroup();
    const layout = self.get('layout');
    const handleStyle = self.get('handleStyle');
    const img = handleStyle.img;
    const iconWidth = handleStyle.width;
    const iconHeight = handleStyle.height;

    let text;
    let handleIcon;
    let triggerCursor;

    if (layout === 'horizontal') {
      const iconWidth = handleStyle.width;
      triggerCursor = 'ew-resize';
      handleIcon = handle.addShape('Image', {
        attrs: {
          x: -iconWidth / 2,
          y: 0,
          width: iconWidth,
          height: iconHeight,
          img,
          cursor: triggerCursor
        }
      });
      text = handle.addShape('Text', {
        attrs: Util.mix({
          x: (type === 'min') ? -(iconWidth / 2 + OFFSET) : iconWidth / 2 + OFFSET,
          y: iconHeight / 2,
          textAlign: (type === 'min') ? 'end' : 'start',
          textBaseline: 'middle',
          text: type === 'min' ? this.get('minText') : this.get('maxText'),
          cursor: triggerCursor
        }, this.get('textStyle'))
      });
    } else {
      triggerCursor = 'ns-resize';
      handleIcon = handle.addShape('Image', {
        attrs: {
          x: 0,
          y: -iconHeight / 2,
          width: iconWidth,
          height: iconHeight,
          img,
          cursor: triggerCursor
        }
      });
      text = handle.addShape('Text', {
        attrs: Util.mix({
          x: iconWidth / 2,
          y: (type === 'min') ? (iconHeight / 2 + OFFSET) : -(iconHeight / 2 + OFFSET),
          textAlign: 'center',
          textBaseline: 'middle',
          text: type === 'min' ? this.get('minText') : this.get('maxText'),
          cursor: triggerCursor
        }, this.get('textStyle'))
      });
    }

    this.set(type + 'TextElement', text);
    this.set(type + 'IconElement', handleIcon);
    return handle;
  },

  _initSliderBackground() {
    const backgroundElement = this.addGroup();
    backgroundElement.initTransform();
    backgroundElement.translate(0, 0);
    backgroundElement.addShape('Rect', {
      attrs: Util.mix({
        x: 0,
        y: 0,
        width: this.get('width'),
        height: this.get('height')
      }, this.get('backgroundStyle'))
    });
    return backgroundElement;
  },

  _beforeRenderUI() {
    const backgroundElement = this._initSliderBackground();
    const minHandleElement = this._initHandle('min');
    const maxHandleElement = this._initHandle('max');
    const middleHandleElement = this.addShape('rect', {
      attrs: this.get('middleAttr')
    });

    this.set('middleHandleElement', middleHandleElement);
    this.set('minHandleElement', minHandleElement);
    this.set('maxHandleElement', maxHandleElement);
    this.set('backgroundElement', backgroundElement);
    backgroundElement.set('zIndex', 0);
    middleHandleElement.set('zIndex', 1);
    minHandleElement.set('zIndex', 2);
    maxHandleElement.set('zIndex', 2);
    middleHandleElement.attr('cursor', 'move');
    this.sort();
  },

  _renderUI() {
    if (this.get('layout') === 'horizontal') {
      this._renderHorizontal();
    } else {
      this._renderVertical();
    }
  },

  _transform(layout) {
    const range = this.get('range');
    const minRatio = range[0] / 100;
    const maxRatio = range[1] / 100;
    const width = this.get('width');
    const height = this.get('height');
    const minHandleElement = this.get('minHandleElement');
    const maxHandleElement = this.get('maxHandleElement');
    const middleHandleElement = this.get('middleHandleElement');
    if (minHandleElement.resetMatrix) {
      minHandleElement.resetMatrix();
      maxHandleElement.resetMatrix();
    } else {
      minHandleElement.initTransform();
      maxHandleElement.initTransform();
    }
    if (layout === 'horizontal') {
      middleHandleElement.attr({
        x: width * minRatio,
        y: 0,
        width: (maxRatio - minRatio) * width,
        height
      });

      minHandleElement.translate(minRatio * width, 0);
      maxHandleElement.translate(maxRatio * width, 0);
    } else {
      middleHandleElement.attr({
        x: 0,
        y: height * (1 - maxRatio),
        width,
        height: (maxRatio - minRatio) * height
      });
      minHandleElement.translate(0, (1 - minRatio) * height);
      maxHandleElement.translate(0, (1 - maxRatio) * height);
    }
  },

  _renderHorizontal() {
    this._transform('horizontal');
  },

  _renderVertical() {
    this._transform('vertical');
  },

  _bindUI() {
    this.on('mousedown', Util.wrapBehavior(this, '_onMouseDown'));
  },

  _isElement(target, name) { // 判断是否是该元素
    const element = this.get(name);
    if (target === element) {
      return true;
    }
    if (element.isGroup) {
      const elementChildren = element.get('children');
      return elementChildren.indexOf(target) > -1;
    }
    return false;
  },

  _getRange(diff, range) {
    let rst = diff + range;
    rst = rst > 100 ? 100 : rst;
    rst = rst < 0 ? 0 : rst;
    return rst;
  },

  _limitRange(diff, limit, range) {
    range[0] = this._getRange(diff, range[0]);
    range[1] = range[0] + limit;
    if (range[1] > 100) {
      range[1] = 100;
      range[0] = range[1] - limit;
    }
  },

  _updateStatus(dim, ev) {
    const totalLength = dim === 'x' ? this.get('width') : this.get('height');
    dim = Util.upperFirst(dim);
    const range = this.get('range');
    const page = this.get('page' + dim);
    const currentTarget = this.get('currentTarget');
    const rangeStash = this.get('rangeStash');
    const layout = this.get('layout');
    const sign = layout === 'vertical' ? -1 : 1;
    const currentPage = ev[ 'page' + dim ];
    const diffPage = currentPage - page;
    const diffRange = (diffPage / totalLength) * 100 * sign;
    let diffStashRange;

    const minRange = this.get('minRange');
    const maxRange = this.get('maxRange');

    if (range[1] <= range[0]) {
      if (this._isElement(currentTarget, 'minHandleElement') || this._isElement(currentTarget, 'maxHandleElement')) {
        range[0] = this._getRange(diffRange, range[0]);
        range[1] = this._getRange(diffRange, range[0]);
      }
    } else {
      if (this._isElement(currentTarget, 'minHandleElement')) {
        range[0] = this._getRange(diffRange, range[0]);
        if (minRange) { // 设置了最小范围
          if ((range[1] - range[0]) <= minRange) {
            this._limitRange(diffRange, minRange, range);
          }
        }

        if (maxRange) { // 设置了最大范围
          if (range[1] - range[0] >= maxRange) {
            this._limitRange(diffRange, maxRange, range);
          }
        }
      }
      if (this._isElement(currentTarget, 'maxHandleElement')) {
        range[1] = this._getRange(diffRange, range[1]);

        if (minRange) { // 设置了最小范围
          if ((range[1] - range[0]) <= minRange) {
            this._limitRange(diffRange, minRange, range);
          }
        }

        if (maxRange) { // 设置了最大范围
          if (range[1] - range[0] >= maxRange) {
            this._limitRange(diffRange, maxRange, range);
          }
        }
      }
    }

    if (this._isElement(currentTarget, 'middleHandleElement')) {
      diffStashRange = (rangeStash[1] - rangeStash[0]);
      this._limitRange(diffRange, diffStashRange, range);
    }

    this.emit('sliderchange', {
      range
    });

    this.set('page' + dim, currentPage);
    this._renderUI();
    this.get('canvas').draw(); // need delete
    return;
  },

  _onMouseDown(ev) {
    const currentTarget = ev.currentTarget;
    const originEvent = ev.event;
    const range = this.get('range');
    originEvent.stopPropagation();
    originEvent.preventDefault();
    this.set('pageX', originEvent.pageX);
    this.set('pageY', originEvent.pageY);
    this.set('currentTarget', currentTarget);
    this.set('rangeStash', [ range[0], range[1] ]);
    this._bindCanvasEvents();
  },

  _bindCanvasEvents() {
    const containerDOM = this.get('canvas').get('containerDOM');
    this.onMouseMoveListener = DomUtil.addEventListener(containerDOM, 'mousemove', Util.wrapBehavior(this, '_onCanvasMouseMove'));
    this.onMouseUpListener = DomUtil.addEventListener(containerDOM, 'mouseup', Util.wrapBehavior(this, '_onCanvasMouseUp'));
    // @2018-06-06 by blue.lb 添加mouseleave事件监听，让用户在操作出滑块区域后有一个“正常”的效果，可以正常重新触发滑块的操作流程
    this.onMouseLeaveListener = DomUtil.addEventListener(containerDOM, 'mouseleave', Util.wrapBehavior(this, '_onCanvasMouseUp'));
  },

  _onCanvasMouseMove(ev) {
    const layout = this.get('layout');
    if (layout === 'horizontal') {
      this._updateStatus('x', ev);
    } else {
      this._updateStatus('y', ev);
    }
  },

  _onCanvasMouseUp() {
    this._removeDocumentEvents();
  },

  _removeDocumentEvents() {
    this.onMouseMoveListener.remove();
    this.onMouseUpListener.remove();
    this.onMouseLeaveListener.remove();
  }
});

module.exports = Range;
