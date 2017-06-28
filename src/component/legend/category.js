const Util = require('../../util');
const Base = require('./base');
const { DomUtil } = require('@ali/g');

function findNodeByClass(node, className) {
  return node.getElementsByClassName(className)[0];
}

class Category extends Base {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * type标识
       * @type {String}
       */
      type: 'category-legend',
      /**
       * 子项集合
       * @type {Array}
       */
      items: null,
      /**
       * TODO：rename
       * 图例项水平方向的间距
       * @type {Number}
       */
      itemGap: 5,
      /**
       * TODO：rename
       * 图例标题距离图例项的距离
       * @type {Number}
       */
      titleGap: 15,
      /**
       * TODO：rename
       * 图例项垂直方向的间距
       * @type {Number}
       */
      itemMarginBottom: 8,
      /**
       * 图例项图组
       * @type {Group}
       */
      itemsGroup: null,
      /**
       * 布局方式： horizontal，vertical
       * @type {String}
       */
      layout: 'horizontal',
      /**
       * 是否允许全部取消，默认 false，即必须保留一个被选中
       * @type {Boolean}
       */
      allowAllCanceled: true,
      /**
       * 边框内边距
       * @type {Array}
       */
      backPadding: [ 0, 0, 0, 0 ],
      /**
       * 是否能被点击
       * @type {Boolean}
       */
      checkable: true,
      /**
       * 图例项取消选中属性
       * @type {Object}
       */
      unCheckStyle: {
        fill: '#ccc'
      },
      /**
       * 图例背景层属性设置
       * @type {Obejct}
       */
      background: null,
      /**
       * 图例项的宽度，当图例有很多图例项，并且用户想要这些图例项在同一平面内垂直对齐，此时这个属性可帮用户实现此效果
       * @type {Number}
       */
      itemWidth: null,
      /**
       * marker 和文字的距离
       * @type {Number}
       */
      _wordSpaceing: 6,
      _defaultTextStyle: {
        fill: '#333',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      },
      /**
       * 是否使用 html 进行渲染，默认为 false
       * @type {Boolean}
       */
      useHtml: false,
      /**
       * 使用html时的外层模板
       * @type {String}
       */
      containerTpl: '<div class="g-legend" style="position:absolute;top:0;left:0;">' +
        '<h4 class="g-legend-title"></h4>' +
        '<ul class="g-legend-itemlist" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
      /**
       * 默认的图例项 html 模板
       * @type {String}
       */
      _defaultItemTpl: '<li class="g-legend-item item-${ index } ${ checked }">' +
        '<i style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: ${ color };"></i>' +
        '<span class="g-legend-text">${ value }</span></li>',
      /**
       * 用户设置的图例项 html 模板
       * @type {String|Function}
       */
      itemTpl: null,
      /**
       * 当用户使用 html 的时候，超出高度或者宽度会自动换行
       * @type {Boolean}
       */
      scroll: true
    });
  }

  _beforeRenderUI() {
    super._beforeRenderUI();
  }

  _renderUI() {
    if (!this.get('useHtml')) {
      super._renderUI();
      this._renderItems();
      this._adjustItems();
      this._renderBack();
    } else { // 使用 html 渲染图例
      this._renderHTML();
    }
  }

  _renderHTML() {
    const self = this;
    const canvas = self.get('canvas');
    const outterNode = canvas.get('el').parentNode;
    const title = this.get('title');
    const containerTpl = self.get('containerTpl');
    const legendWrapper = DomUtil.createDom(containerTpl);
    const titleDom = findNodeByClass(legendWrapper, 'g-legend-title');
    const itemListDom = findNodeByClass(legendWrapper, 'g-legend-itemlist');

    if (titleDom && title && title.text) { // 渲染标题
      titleDom.innerHTML = title.text;
    }

    // 开始渲染图例项
    const items = self.get('items');
    let itemTpl = self.get('_defaultItemTpl');
    const userItemTpl = self.get('itemTpl');
    if (userItemTpl && userItemTpl !== itemTpl) {
      itemTpl = userItemTpl;
    }

    Util.each(items, function(item, index) {
      const checked = item.checked;
      const value = item.value;
      const color = checked ? item.color : self.get('unCheckStyle').fill;
      let domStr;
      if (Util.isFunction(itemTpl)) {
        domStr = itemTpl(value, color, checked, index);
      } else {
        domStr = itemTpl;
      }
      const stringCompiler = Util.template(domStr);
      const itemDiv = stringCompiler({ index, checked: checked ? 'checked' : 'unChecked', value, color });
      const itemDom = DomUtil.createDom(itemDiv);
      const textDom = findNodeByClass(itemDom, 'g-legend-text');
      if (!checked) {
        textDom.style.color = self.get('unCheckStyle').fill;
      }
      itemListDom.appendChild(itemDom);
    });

    if (self.get('scroll')) {
      const width = self.get('width') || canvas.get('width');
      const height = self.get('height') || canvas.get('height');
      DomUtil.modiCSS(legendWrapper, {
        width: width + 'px',
        height: height + 'px',
        overflow: 'scroll'
      });
    }


    outterNode.appendChild(legendWrapper);
  }

  _renderItems() {
    const self = this;
    const items = self.get('items');
    Util.each(items, function(item, index) {
      self._addItem(item, index);
    });
  }

  _adjustHorizontal() {
    const itemsGroup = this.get('itemsGroup');
    const children = itemsGroup.get('children');
    const maxLength = this.get('maxLength');
    const itemGap = this.get('itemGap');
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleGap = this.get('titleShape') ? this.get('titleGap') : 0;
    let row = 1;
    let rowLength = 0;
    let width;
    let height;
    let box;
    const itemWidth = this.get('itemWidth');
    if (itemsGroup.getBBox().width > maxLength) {
      Util.each(children, function(child) {
        box = child.getBBox();
        width = itemWidth || box.width;
        height = box.height + itemMarginBottom;

        if (maxLength - rowLength < width) {
          row++;
          rowLength = 0;
        }
        child.move(rowLength, row * height + titleGap);
        rowLength += width + itemGap;
      });
    }
    return;
  }

  _getNextX() {
    const layout = this.get('layout');
    const itemGap = this.get('itemGap');
    const itemsGroup = this.get('itemsGroup');
    const itemWidth = this.get('itemWidth');
    const children = itemsGroup.get('children');
    let nextX = 0;

    if (layout === 'horizontal') { // 水平布局
      Util.each(children, function(v) {
        nextX += (itemWidth ? itemWidth : v.getBBox().width) + itemGap;
      });
    }
    return nextX;
  }

  _getNextY() {
    const itemGap = this.get('itemGap');
    const titleGap = this.get('titleShape') ? this.get('titleGap') : 0;
    const layout = this.get('layout');
    const itemsGroup = this.get('itemsGroup');
    const titleShape = this.get('titleShape');
    const children = itemsGroup.get('children');
    let nextY = titleGap;
    if (titleShape) {
      nextY += titleShape.getBBox().height;
    }

    if (layout === 'vertical') { // 竖直布局
      Util.each(children, function(v) {
        nextY += v.getBBox().height + itemGap;
      });
    }
    return nextY;
  }

  _formatItemValue(value) {
    const formatter = this.get('itemFormatter');
    if (formatter) {
      value = formatter.call(this, value);
    }
    return value;
  }

  _addItem(item) {
    const itemsGroup = this.get('itemsGroup');
    const x = this._getNextX();
    const y = this._getNextY();
    const unCheckStyle = this.get('unCheckStyle');
    const itemGroup = itemsGroup.addGroup({
      x,
      y
    });
    const textStyle = Util.mix(this.get('_defaultTextStyle'), item.textStyle);
    const wordSpace = this.get('_wordSpaceing');
    let startX = 0;

    if (item.marker) { // 如果有marker添加marker
      const markerAttrs = Util.mix({}, item.marker, {
        x: item.marker.radius + x,
        y
      });

      if (!item.checked) {
        Util.mix(markerAttrs, unCheckStyle);
      }

      const markerShape = itemGroup.addShape('marker', {
        type: 'marker',
        attrs: markerAttrs
      });
      startX += markerShape.getBBox().width + wordSpace;
    }

    const textAttrs = Util.mix({}, textStyle, {
      x: startX + x,
      y,
      text: this._formatItemValue(item.value)
    });
    if (!item.checked) {
      Util.mix(textAttrs, unCheckStyle);
    }

    const textShape = itemGroup.addShape('text', {
      attrs: textAttrs
    });

    startX += wordSpace + textShape.getBBox().width;
    itemGroup.name = 'legend-item';
    return itemGroup;
  }

  _adjustItems() {
    const layout = this.get('layout');
    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  }

  _adjustVertical() {
    const itemsGroup = this.get('itemsGroup');
    const titleShape = this.get('titleShape');
    const children = itemsGroup.get('children');
    const maxLength = this.get('maxLength'); // 垂直布局，则 maxLength 代表容器的高度
    const itemGap = this.get('itemGap');
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleGap = this.get('titleGap');
    const titleHeight = titleShape ? titleShape.getBBox().height + titleGap : 0;
    const itemWidth = this.get('itemWidth');
    let colLength = titleHeight;
    let width;
    let height;
    let box;
    let maxItemWidth = 0;
    let totalLength = 0;

    if (itemsGroup.getBBox().height > maxLength) {
      Util.each(children, function(v) {
        box = v.getBBox();
        width = box.width;
        height = box.height;

        if (itemWidth) {
          maxItemWidth = itemWidth + itemGap;
        } else if (width > maxItemWidth) {
          maxItemWidth = width + itemGap;
        }

        if (maxLength - colLength < height) {
          colLength = titleHeight;
          totalLength += maxItemWidth;
          v.move(totalLength, titleHeight);
        } else {
          v.move(totalLength, colLength);
        }

        colLength += height + itemMarginBottom;
      });
    }
    return;
  }

  _bindUI() {
    // 绑定组件事件
  }

  _renderBack() {
    const itemsGroup = this.get('itemsGroup');
    const padding = this.get('backPadding');
    const backAttrs = this.get('background');
    itemsGroup.renderBack(padding, backAttrs);
  }
}

module.exports = Category;
