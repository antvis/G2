const Util = require('../../util');
const Base = require('./base');
const { DomUtil, Event, Group } = require('@ali/g');

const CONTAINER_CLASS = 'g2-legend';
const TITLE_CLASS = 'g2-legend-title';
const LIST_CLASS = 'g2-legend-itemlist';
const ITEM_CLASS = 'g2-legend-item';
const TEXT_CLASS = 'g2-legend-text';
const MARKER_CLASS = 'g2-legend-marker';

function findNodeByClass(node, className) {
  return node.getElementsByClassName(className)[0];
}

function getParentNode(node, className) {
  let nodeClass = node.className;
  nodeClass = nodeClass.split(' ');
  if (nodeClass.indexOf(className) > -1) {
    return node;
  }

  if (node.parentNode) {
    if (node.parentNode.className === CONTAINER_CLASS) {
      return node.parentNode;
    }
    return getParentNode(node.parentNode, className);
  }

  return null;
}

function findItem(items, refer) {
  let rst = null;
  const value = (refer instanceof Group) ? refer.get('value') : refer;
  Util.each(items, function(item) {
    if (item.value === value) {
      rst = item;
      return false;
    }
  });

  return rst;
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
      allowAllCanceled: false,
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
       * 图例项取消选中的颜色
       * @type {String}
       */
      unCheckColor: '#ccc',
      /**
       * 图例背景层属性设置
       * @type {Obejct}
       */
      background: {
        fill: '#fff',
        fillOpacity: 0
      },
      /**
       * 图例项的宽度，当图例有很多图例项，并且用户想要这些图例项在同一平面内垂直对齐，此时这个属性可帮用户实现此效果
       * @type {Number}
       */
      itemWidth: null,
      textStyle: {
        fill: '#333',
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle'
      },
      /**
       * marker 和文字的距离
       * @type {Number}
       */
      _wordSpaceing: 8,
      /**
       * 是否使用 html 进行渲染，默认为 false
       * @type {Boolean}
       */
      useHtml: false,
      container: null,
      /**
       * 使用html时的外层模板
       * @type {String}
       */
      containerTpl: '<div class="' + CONTAINER_CLASS + '">' +
        '<h4 class="' + TITLE_CLASS + '"></h4>' +
        '<ul class="' + LIST_CLASS + '" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
      /**
       * 默认的图例项 html 模板
       * @type {String}
       */
      _defaultItemTpl: '<li class="' + ITEM_CLASS + ' item-${ index } ${ checked }" data-color="${ originColor }" data-value="${ originValue }" style="cursor: pointer;font-size: 12px;margin-bottom:5px;">' +
        '<i class="' + MARKER_CLASS + '" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:8px;background-color:${ color };vertical-align:middle"></i>' +
        '<span class="' + TEXT_CLASS + '">${ value }</span></li>',
      /**
       * 用户设置的图例项 html 模板
       * @type {String|Function}
       */
      itemTpl: null,
      /**
       * 当用户使用 html 的时候，超出高度或者宽度会自动换行
       * @type {Boolean}
       */
      scroll: true,
      /**
       * 图例项是否可点击，默认为 true
       * @type {Boolean}
       */
      clickable: true,
      /**
       * TODO: rename
       * 图例项的选择模式，多选和单选 multiple、single
       * @type {String}
       */
      selectedMode: 'multiple',
      /**
       * 图例项的顺序是否要逆序，默认为 false
       * @type {Boolean}
       */
      reversed: false
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

  _bindUI() {
    if (this.get('hoverable')) {
      this.on('mousemove', Util.wrapBehavior(this, '_onMousemove'));
      this.on('mouseleave', Util.wrapBehavior(this, '_onMouseleave'));
    }

    if (this.get('clickable')) {
      this.on('click', Util.wrapBehavior(this, '_onClick'));
    }
  }

  _getLegendItem(target) {
    const item = target.get('parent');
    if (item && (item.name === 'legendGroup')) {
      return item;
    }
    return null;
  }

  _onMousemove(ev) {
    const item = this._getLegendItem(ev.currentTarget);
    if (item && item.get('checked')) {
      const items = this.get('items');
      const itemhover = new Event('itemhover', ev, true, true);
      itemhover.item = findItem(items, item);
      itemhover.checked = item.get('checked');
      this.emit('itemhover', itemhover);
    } else if (!item) {
      this.emit('itemunhover', ev);
    }

    return;
  }

  _onMouseleave(ev) {
    this.emit('itemunhover', ev);
    return;
  }

  _onClick(ev) {
    const clickedItem = this._getLegendItem(ev.currentTarget);
    const items = this.get('items');
    if (clickedItem && !clickedItem.get('destroyed')) {
      const checked = clickedItem.get('checked');
      if (!this.get('allowAllCanceled') && checked && this.getCheckedCount() === 1) {
        return;
      }
      const mode = this.get('selectedMode');
      const item = findItem(items, clickedItem);
      const itemclick = new Event('itemclick', ev, true, true);
      itemclick.item = item;
      itemclick.currentTarget = clickedItem;
      itemclick.checked = (mode === 'single') ? true : !checked;
      this.emit('itemclick', itemclick);
    }
    return;
  }

  _renderHTML() {
    const self = this;
    const canvas = self.get('canvas');
    const outterNode = canvas.get('el').parentNode;
    const title = this.get('title');
    const containerTpl = self.get('containerTpl');
    const legendWrapper = DomUtil.createDom(containerTpl);
    const titleDom = findNodeByClass(legendWrapper, TITLE_CLASS);
    const itemListDom = findNodeByClass(legendWrapper, LIST_CLASS);
    const unCheckedColor = self.get('unCheckColor');
    const mode = self.get('selectedMode');

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

    if (self.get('reversed')) {
      items.reverse();
    }

    Util.each(items, function(item, index) {
      const checked = item.checked;
      const value = self._formatItemValue(item.value);
      const color = checked ? item.marker.fill : unCheckedColor;
      let domStr;
      if (Util.isFunction(itemTpl)) {
        domStr = itemTpl(value, color, checked, index);
      } else {
        domStr = itemTpl;
      }
      const stringCompiler = Util.template(domStr);
      const itemDiv = stringCompiler({
        index,
        checked: checked ? 'checked' : 'unChecked',
        value,
        color,
        originColor: item.marker.fill,
        originValue: item.value
      });
      const itemDom = DomUtil.createDom(itemDiv);
      if (!checked) {
        itemDom.style.color = unCheckedColor;
      }
      itemListDom.appendChild(itemDom);
    });

    if (self.get('clickable')) {
      const childNodes = itemListDom.childNodes;
      // 注册事件
      legendWrapper.onclick = ev => {
        const target = ev.target;
        let targetClass = target.className;
        targetClass = targetClass.split(' ');
        if (targetClass.indexOf(CONTAINER_CLASS) > -1 || targetClass.indexOf(LIST_CLASS) > -1) {
          return;
        }
        const parentDom = getParentNode(target, ITEM_CLASS);
        const clickedItem = findItem(items, parentDom.getAttribute('data-value'));

        if (!clickedItem) {
          return;
        }

        const domClass = parentDom.className;
        const clickedItemChecked = domClass.includes('checked');
        let count = 0;
        Util.each(childNodes, child => {
          if (child.className.includes('checked')) {
            count++;
          }
        });

        if (!this.get('allowAllCanceled') && clickedItemChecked && count === 1) {
          return;
        }

        self.emit('itemclick', {
          item: clickedItem,
          currentTarget: parentDom,
          checked: (mode === 'single') ? true : !clickedItem.checked
        });
      };
    }
    if (self.get('hoverable')) {
      legendWrapper.onmousemove = ev => {
        const target = ev.target;
        let targetClass = target.className;
        targetClass = targetClass.split(' ');
        if (targetClass.indexOf(CONTAINER_CLASS) > -1 || targetClass.indexOf(LIST_CLASS) > -1) {
          return;
        }
        const parentDom = getParentNode(target, ITEM_CLASS);
        const domClass = parentDom.className;
        const hoveredItem = findItem(items, parentDom.getAttribute('data-value'));
        if (hoveredItem && domClass.includes('checked')) {
          self.emit('itemhover', {
            item: hoveredItem,
            currentTarget: parentDom,
            checked: hoveredItem.checked
          });
        } else if (!hoveredItem) {
          self.emit('itemunhover', ev);
        }
      };

      legendWrapper.onmouseout = ev => {
        self.emit('itemunhover', ev);
      };
    }

    let container = self.get('container');
    if (/^\#/.test(container)) { // 如果传入 dom 节点的 id
      const id = container.replace('#', '');
      container = document.getElementById(id);
      // container.style.position = 'relative';
      container.appendChild(legendWrapper);
    } else {
      if (self.get('scroll')) {
        const width = canvas.get('width');
        const height = canvas.get('height');
        DomUtil.modifyCSS(legendWrapper, {
          maxWidth: width + 'px',
          maxHeight: height + 'px',
          overflow: 'scroll'
        });
      }
      outterNode.appendChild(legendWrapper);
    }
    self.set('legendWrapper', legendWrapper);
  }

  _renderItems() {
    const self = this;
    const items = self.get('items');
    if (self.get('reversed')) {
      items.reverse();
    }
    Util.each(items, function(item, index) {
      self._addItem(item, index);
    });
  }

  _renderBack() {
    const padding = this.get('backPadding');
    const backAttrs = this.get('background');
    this.renderBack(padding, backAttrs);
  }

  _formatItemValue(value) {
    const formatter = this.get('itemFormatter');
    if (formatter) {
      value = formatter.call(this, value);
    }
    return value;
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
    const itemMarginBottom = this.get('itemMarginBottom');
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
        nextY += v.getBBox().height + itemMarginBottom;
      });
    }
    return nextY;
  }

  _addItem(item) {
    const itemsGroup = this.get('itemsGroup');
    const x = this._getNextX();
    const y = this._getNextY();
    const unCheckColor = this.get('unCheckColor');
    const itemGroup = itemsGroup.addGroup({
      x,
      y,
      value: item.value,
      checked: item.checked
    });

    const textStyle = this.get('textStyle');
    const wordSpace = this.get('_wordSpaceing');
    let startX = 0;

    if (item.marker) { // 如果有marker添加marker
      const markerAttrs = Util.mix({}, item.marker, {
        x: item.marker.radius + x,
        y
      });

      if (!item.checked) {
        if (markerAttrs.fill) {
          markerAttrs.fill = unCheckColor;
        }
        if (markerAttrs.stroke) {
          markerAttrs.stroke = unCheckColor;
        }
      }

      const markerShape = itemGroup.addShape('marker', {
        type: 'marker',
        attrs: markerAttrs
      });
      markerShape.attr('cursor', 'pointer');
      markerShape.name = 'legend-marker';
      startX += markerShape.getBBox().width + wordSpace;
    }

    const textAttrs = Util.mix({}, textStyle, {
      x: startX + x,
      y,
      text: this._formatItemValue(item.value)
    });
    if (!item.checked) {
      Util.mix(textAttrs, {
        fill: unCheckColor
      });
    }

    const textShape = itemGroup.addShape('text', {
      attrs: textAttrs
    });
    textShape.attr('cursor', 'pointer');
    textShape.name = 'legend-text';
    // 添加一个包围矩形，用于事件支持
    const bbox = itemGroup.getBBox();
    const itemWidth = this.get('itemWidth');
    const wrapperShape = itemGroup.addShape('rect', {
      attrs: {
        x,
        y: y - bbox.height / 2,
        fill: '#fff',
        fillOpacity: 0,
        width: itemWidth || bbox.width,
        height: bbox.height
      }
    });
    wrapperShape.attr('cursor', 'pointer');
    wrapperShape.name = 'legend-item';
    itemGroup.name = 'legendGroup';
    return itemGroup;
  }

  _adjustHorizontal() {
    const itemsGroup = this.get('itemsGroup');
    const children = itemsGroup.get('children');
    const maxLength = this.get('maxLength');
    const itemGap = this.get('itemGap');
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleGap = this.get('titleShape') ? this.get('titleGap') : 0;
    let row = 0;
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

  _adjustItems() {
    const layout = this.get('layout');
    if (layout === 'horizontal') {
      this._adjustHorizontal();
    } else {
      this._adjustVertical();
    }
  }

  getWidth() {
    if (this.get('useHtml')) {
      return DomUtil.getWidth(this.get('legendWrapper'));
    }
    return super.getWidth();
  }

  getHeight() {
    if (this.get('useHtml')) {
      return DomUtil.getHeight(this.get('legendWrapper'));
    }

    return super.getHeight();
  }

  move(x, y) {
    if (this.get('useHtml') && !(/^\#/.test(this.get('container')))) {
      DomUtil.modifyCSS(this.get('legendWrapper'), {
        left: x + 'px',
        top: y + 'px',
        position: 'absolute'
      });
    } else {
      super.move(x, y);
    }
  }

  remove() {
    if (this.get('useHtml')) {
      const legendWrapper = this.get('legendWrapper');
      if (legendWrapper && legendWrapper.parentNode) {
        legendWrapper.parentNode.removeChild(legendWrapper);
      }
    } else {
      super.remove();
    }
  }
}

module.exports = Category;
