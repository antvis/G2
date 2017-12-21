/**
 * @fileOverview The class of slider
 * @author sima.zhang
 */
const Util = require('../../util');
const { Group, DomUtil } = require('@antv/g');

class Slider extends Group {
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
  }

  _beforeRenderUI() {
    const layout = this.get('layout');
    const backgroundElement = this.get('backgroundElement');
    const minHandleElement = this.get('minHandleElement');
    const maxHandleElement = this.get('maxHandleElement');
    const middleHandleElement = this.addShape('rect', {
      attrs: this.get('middleAttr')
    });
    const trigerCursor = (layout === 'vertical') ? 'ns-resize' : 'ew-resize';

    this.add([ backgroundElement, minHandleElement, maxHandleElement ]);
    this.set('middleHandleElement', middleHandleElement);
    backgroundElement.set('zIndex', 0);
    middleHandleElement.set('zIndex', 1);
    minHandleElement.set('zIndex', 2);
    maxHandleElement.set('zIndex', 2);
    middleHandleElement.attr('cursor', trigerCursor);
    minHandleElement.attr('cursor', trigerCursor);
    maxHandleElement.attr('cursor', trigerCursor);
    this.sort();
  }

  _renderUI() {
    if (this.get('layout') === 'horizontal') {
      this._renderHorizontal();
    } else {
      this._renderVertical();
    }
  }

  _transform(layout) {
    const range = this.get('range');
    const minRatio = range[0] / 100;
    const maxRatio = range[1] / 100;
    const width = this.get('width');
    const height = this.get('height');
    const minHandleElement = this.get('minHandleElement');
    const maxHandleElement = this.get('maxHandleElement');
    const middleHandleElement = this.get('middleHandleElement');

    minHandleElement.initTransform();
    maxHandleElement.initTransform();

    if (layout === 'horizontal') {
      middleHandleElement.attr({
        x: width * minRatio,
        y: 0,
        width: (maxRatio - minRatio) * width,
        height
      });
      minHandleElement.translate(minRatio * width, height);
      maxHandleElement.translate(maxRatio * width, height);
    } else {
      middleHandleElement.attr({
        x: 0,
        y: height * (1 - maxRatio),
        width,
        height: (maxRatio - minRatio) * height
      });
      minHandleElement.translate(width / 2, (1 - minRatio) * height);
      maxHandleElement.translate(width / 2, (1 - maxRatio) * height);
    }
  }

  _renderHorizontal() {
    this._transform('horizontal');
  }

  _renderVertical() {
    this._transform('vertical');
  }

  _bindUI() {
    this.on('mousedown', Util.wrapBehavior(this, '_onMouseDown'));
  }

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
  }

  _getRange(diff, range) {
    let rst = diff + range;
    rst = rst > 100 ? 100 : rst;
    rst = rst < 0 ? 0 : rst;
    return rst;
  }

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

    if (range[1] <= range[0]) {
      if (this._isElement(currentTarget, 'minHandleElement') || this._isElement(currentTarget, 'maxHandleElement')) {
        range[0] = this._getRange(diffRange, range[0]);
        range[1] = this._getRange(diffRange, range[0]);
      }
    } else {
      if (this._isElement(currentTarget, 'minHandleElement')) {
        range[0] = this._getRange(diffRange, range[0]);
      }
      if (this._isElement(currentTarget, 'maxHandleElement')) {
        range[1] = this._getRange(diffRange, range[1]);
      }
    }

    if (this._isElement(currentTarget, 'middleHandleElement')) {
      diffStashRange = (rangeStash[1] - rangeStash[0]);
      range[0] = this._getRange(diffRange, range[0]);
      range[1] = range[0] + diffStashRange;
      if (range[1] > 100) {
        range[1] = 100;
        range[0] = range[1] - diffStashRange;
      }
    }

    this.emit('sliderchange', {
      range
    });

    this.set('page' + dim, currentPage);
    this._renderUI();
    this.get('canvas').draw(); // need delete
    return;
  }

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
  }

  _bindCanvasEvents() {
    const containerDOM = this.get('canvas').get('containerDOM');
    this.onMouseMoveListener = DomUtil.addEventListener(containerDOM, 'mousemove', Util.wrapBehavior(this, '_onCanvasMouseMove'));
    this.onMouseUpListener = DomUtil.addEventListener(containerDOM, 'mouseup', Util.wrapBehavior(this, '_onCanvasMouseUp'));
  }

  _onCanvasMouseMove(ev) {
    const layout = this.get('layout');
    if (layout === 'horizontal') {
      this._updateStatus('x', ev);
    } else {
      this._updateStatus('y', ev);
    }
  }

  _onCanvasMouseUp() {
    this._removeDocumentEvents();
  }

  _removeDocumentEvents() {
    this.onMouseMoveListener.remove();
    this.onMouseUpListener.remove();
  }
}

module.exports = Slider;
