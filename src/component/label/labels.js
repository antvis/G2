/**
 * @fileOverview The Label class
 * @author sima.zhang
 */
const Util = require('../../util');
const { DomUtil, Group } = require('@antv/g');

class Labels extends Group {
  getDefaultCfg() {
    return {
      zIndex: 6,
      /**
       * 显示的文本集合
       * @type {Array}
       */
      items: null,
      /**
       * 文本样式
       * @type {(Object|Function)}
       */
      textStyle: null,
      /**
       * 文本显示格式化回调函数
       * @type {Function}
       */
      formatter: null,
      /**
       * 使用 html 渲染文本
       * @type {(String|Function)}
      */
      htmlTemplate: null,
      /**
       * html 渲染时用的容器的模板，必须存在 class = "g-labels"
       * @type {String}
       */
      _containerTpl: '<div class="g-labels" style="position:absolute;top:0;left:0;"></div>',
      /**
       * html 渲染时单个 label 的模板，必须存在 class = "g-label"，如果 htmlTemplate 为字符串，则使用 htmlTemplate
       * @type {String}
       */
      _itemTpl: '<div class="g-label" style="position:absolute;">{text}</div>'
    };
  }

  _renderUI() {
    this._drawLabels();
  }

  _drawLabels() {
    const self = this;
    const items = self.get('items');
    Util.each(items, function(item, index) {
      self._addLabel(item, index);
    });
  }

  _addLabel(item, index) {
    const cfg = this._getLabelCfg(item, index);
    return this._createText(cfg);
  }

  _getLabelCfg(item, index) {
    let textStyle = this.get('textStyle') || {};
    const formatter = this.get('formatter');
    const htmlTemplate = this.get('htmlTemplate');

    if (!Util.isObject(item)) {
      const tmp = item;
      item = {};
      item.text = tmp;
    }

    if (Util.isFunction(textStyle)) {
      textStyle = textStyle(item.text, item, index);
    }

    if (formatter) {
      item.text = formatter(item.text, item, index);
    }

    if (Util.isFunction(htmlTemplate)) {
      item.text = htmlTemplate(item.text, item, index);
    }

    if (Util.isNil(item.text)) {
      item.text = '';
    }

    item.text = item.text + ''; // ? 为什么转换为字符串

    const cfg = Util.mix({}, item, textStyle, {
      x: item.x || 0,
      y: item.y || 0
    });

    return cfg;
  }

  _createText(cfg) {
    const htmlTemplate = this.get('htmlTemplate');
    let customDiv = this.get('customDiv');
    let labelShape;

    if (htmlTemplate) {
      if (!customDiv) {
        const containerTpl = this.get('_containerTpl');
        const wrapper = this.get('canvas').get('el').parentNode;
        customDiv = DomUtil.createDom(containerTpl);
        wrapper.style.position = 'relative';
        wrapper.appendChild(customDiv);
        this.set('customDiv', customDiv);
      }

      const node = this._createDom(cfg);
      customDiv.appendChild(node);
      this._setCustomPosition(cfg, node);
    } else {
      const origin = cfg.point;
      delete cfg.point; // 临时解决，否则影响动画
      labelShape = this.addShape('text', {
        attrs: cfg
      });
      labelShape.setSilent('origin', origin);
      labelShape.name = 'label'; // 用于事件标注
      this.get('appendInfo') && labelShape.setSilent('appendInfo', this.get('appendInfo'));
      return labelShape;
    }
  }

  _setCustomPosition(cfg, htmlDom) {
    const textAlign = cfg.textAlign || 'left';
    let top = cfg.y;
    let left = cfg.x;
    const width = DomUtil.getOuterWidth(htmlDom);
    const height = DomUtil.getOuterHeight(htmlDom);

    top = top - height / 2;
    if (textAlign === 'center') {
      left = left - width / 2;
    } else if (textAlign === 'right') {
      left = left - width;
    }

    htmlDom.style.top = parseInt(top, 10) + 'px';
    htmlDom.style.left = parseInt(left, 10) + 'px';
  }

  _createDom(cfg) {
    const itemTpl = this.get('_itemTpl');
    const htmlTemplate = this.get('htmlTemplate');

    if (Util.isString(htmlTemplate)) {
      cfg.text = Util.substitute(htmlTemplate, { text: cfg.text });
    }

    const str = Util.substitute(itemTpl, { text: cfg.text });

    return DomUtil.createDom(str);
  }

  getLabels() {
    const customDiv = this.get('customDiv');
    if (customDiv) {
      return Util.toArray(customDiv.childNodes);
    }
    return this.get('children');
  }

  addLabel(item) {
    const items = this.get('items');
    const count = items.length;
    items.push(item);
    return this._addLabel(item, count);
  }

  changeLabel(oldLabel, newLabel) {
    if (!oldLabel) {
      return;
    }
    const htmlTemplate = this.get('htmlTemplate');
    const index = Util.indexOf(this.getLabels(), oldLabel);
    const cfg = this._getLabelCfg(newLabel, index);
    if (htmlTemplate) {
      const node = this._createDom(cfg);
      oldLabel.innerHTML = node.innerHTML;
      this._setCustomPosition(cfg, oldLabel);
    } else {
      oldLabel._id = newLabel._id;
      oldLabel.attr('text', cfg.text);
      if (oldLabel.attr('x') !== cfg.x || oldLabel.attr('y') !== cfg.y) {
        const rotate = oldLabel.get('attrs').rotate;
        if (rotate) {
          oldLabel.rotateAtStart(-rotate);
          oldLabel.attr(cfg);
          oldLabel.rotateAtStart(rotate);
        } else {
          oldLabel.attr(cfg);
        }
      }
    }
  }

  clear() {
    const customDiv = this.get('customDiv');
    if (customDiv) {
      customDiv.innerHTML = '';
    }
    super.clear();
  }

  setItems(items) {
    this.clear();
    this.set('items', items);
    this._drawLabels();
  }

  remove() {
    const customDiv = this.get('customDiv');
    if (customDiv) {
      customDiv.parentNode.removeChild(customDiv);
    }
    super.remove();
  }
}

module.exports = Labels;
