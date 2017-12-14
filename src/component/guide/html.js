/**
 * @fileOverview the html guide
 * @author sima.zhang
 */
const Util = require('../../util');
const { DomUtil } = require('@antv/g');
const Base = require('./base');

class Html extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * 辅助元素类型
       * @type {String}
       */
      type: 'html',
      zIndex: 7,
      /**
       * dom 显示位置点
       * @type {Object | Array}
       */
      position: null,
      /**
       * 水平方向对齐方式，可取值 'left'、'middle'、'right'
       * @type {String}
       */
      alignX: 'middle',
      /**
       * 垂直方向对齐方式，可取值 'top'、'middle'、'bottom'
       * @type {String}
       */
      alignY: 'middle',
      /**
       * x 方向的偏移量
       * @type {Number}
       */
      offsetX: null,
      /**
       * y 方向的偏移量
       * @type {Number}
       */
      offsetY: null,
      /**
      * html内容
      *@type {String | Function}
      */
      html: null
    });
  }

  render(coord, group) {
    const self = this;
    const position = self.parsePoint(coord, self.position);

    const parentNode = group.get('canvas').get('el').parentNode;
    const wrapperNode = DomUtil.createDom('<div class="g-guide"></div>');
    parentNode.appendChild(wrapperNode);

    let html = self.html;
    if (Util.isFunction(html)) {
      html = html(self.xScales, self.yScales);
    }
    const htmlNode = DomUtil.createDom(html);
    wrapperNode.appendChild(htmlNode);
    self._setDomPosition(wrapperNode, htmlNode, position);
    self.el = wrapperNode;
  }

  _setDomPosition(parentDom, childDom, point) {
    const self = this;
    const alignX = self.alignX;
    const alignY = self.alignY;
    const domWidth = DomUtil.getOuterWidth(childDom);
    const domHeight = DomUtil.getOuterHeight(childDom);

    const position = {
      x: point.x,
      y: point.y
    };

    if (alignX === 'middle' && alignY === 'top') {
      position.x -= Util.round(domWidth / 2);
    } else if (alignX === 'middle' && alignY === 'bottom') {
      position.x -= Util.round(domWidth / 2);
      position.y -= Util.round(domHeight);
    } else if (alignX === 'left' && alignY === 'bottom') {
      position.y -= Util.round(domHeight);
    } else if (alignX === 'left' && alignY === 'middle') {
      position.y -= Util.round(domHeight / 2);
    } else if (alignX === 'left' && alignY === 'top') {
      position.x = point.x;
      position.y = point.y;
    } else if (alignX === 'right' && alignY === 'bottom') {
      position.x -= Util.round(domWidth);
      position.y -= Util.round(domHeight);
    } else if (alignX === 'right' && alignY === 'middle') {
      position.x -= Util.round(domWidth);
      position.y -= Util.round(domHeight / 2);
    } else if (alignX === 'right' && alignY === 'top') {
      position.x -= Util.round(domWidth);
    } else { // 默认位于中心点
      position.x -= Util.round(domWidth / 2);
      position.y -= Util.round(domHeight / 2);
    }

    if (self.offsetX) {
      position.x += self.offsetX;
    }

    if (self.offsetY) {
      position.y += self.offsetY;
    }

    DomUtil.modifyCSS(parentDom, {
      position: 'absolute',
      top: Math.round(position.y) + 'px',
      left: Math.round(position.x) + 'px',
      visibility: 'visible',
      zIndex: self.zIndex
    });
  }

  remove() {
    const self = this;
    const el = self.el;
    if (el) {
      el.parentNode.removeChild(el);
    }
  }

}

module.exports = Html;
