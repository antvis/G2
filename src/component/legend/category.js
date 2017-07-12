const Util = require('../../util');
const Base = require('./base');
const { DomUtil, Event, Group } = require('@ali/g');

function findNodeByClass(node, className) {
  return node.getElementsByClassName(className)[0];
}

function findItem(items, refer) {
  let rst = null;
  const value = (refer instanceof Group) ? refer.get('value') : refer;
  Util.each(items, function(item) {
    if (item.name === value) {
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
      _wordSpaceing: 6,
      // _defaultTextStyle: {
      //   fill: '#333',
      //   fontSize: 12,
      //   textAlign: 'start',
      //   textBaseline: 'middle'
      // },
      /**
       * 是否使用 html 进行渲染，默认为 false
       * @type {Boolean}
       */
      useHtml: false,
      /**
       * 使用html时的外层模板
       * @type {String}
       */
      containerTpl: '<div class="g-legend" style="position:absolute;top:20px;right:60px;">' +
        '<h4 class="g-legend-title"></h4>' +
        '<ul class="g-legend-itemlist" style="list-style-type:none;margin:0;padding:0;"></ul>' +
        '</div>',
      /**
       * 默认的图例项 html 模板
       * @type {String}
       */
      _defaultItemTpl: '<li class="g-legend-item item-${ index } ${ checked }" data-color="${ originColor }" data-value="${ originValue }" style="cursor: pointer;">' +
        '<i class="g-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: ${ color };"></i>' +
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
      selectedMode: 'multiple'
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
      if (this.get('background')) {
        this._renderBack();
      }
    } else { // 使用 html 渲染图例
      this._renderHTML();
    }
  }

  _bindUI() {
    this.on('mousemove', Util.wrapBehavior(this, '_onMousemove'));
    if (this.get('clickable')) {
      this.on('click', Util.wrapBehavior(this, '_onClick'));
    }
  }

  _getLegendItem(target) {
    const item = target.get('parent');
    if (item && (item.name === 'legend-item')) {
      return item;
    }
    return null;
  }

  _onMousemove(ev) {
    const canvas = this.get('canvas');
    const item = this._getLegendItem(ev.currentTarget);
    const canvasNode = canvas.get('el');

    if (item) {
      const itemhover = new Event('legend:hover', ev);
      itemhover.item = item;
      itemhover.checked = item.get('checked');
      this.trigger('legend:hover', [ itemhover ]);
    }

    return;
  }

  _onClick(ev) {
    const clickedItem = this._getLegendItem(ev.currentTarget);
    const items = this.get('items');
    if (clickedItem) {
      const checked = clickedItem.get('checked');
      if (!this.get('allowAllCanceled') && checked && this.getCheckedCount() === 1) {
        return;
      }
      const mode = this.get('selectedMode');
      const item = findItem(items, clickedItem);
      const itemclick = new Event('legend:click', ev);
      itemclick.item = item;
      itemclick.currentTarget = clickedItem;
      itemclick.checked = (mode === 'single') ? true : !checked;
      this.trigger('legend:click', [ itemclick ]); // TODO: 到底是 canvas 还是 legend 对象抛出事件?

      const unCheckColor = this.get('unCheckStyle').fill;
      const checkColor = this.get('textStyle').fill;
      if (mode === 'single') {
        const itemsGroup = this.get('itemsGroup');
        const children = itemsGroup.get('children');
        Util.each(children, child => {
          // TODO：如果外部传入初始状态，则不需要此操作
          if (child !== clickedItem) {
            child.set('checked', false);
            child.get('children')[0].attr('fill', unCheckColor);
            child.get('children')[1].attr('fill', unCheckColor);
          } else {
            clickedItem.get('children')[0].attr('fill', item.marker.fill);
            clickedItem.get('children')[1].attr('fill', checkColor);
            clickedItem.set('checked', true);
          }
        });
      } else {
        clickedItem.get('children')[0].attr('fill', checked ? unCheckColor : item.marker.fill);
        clickedItem.get('children')[1].attr('fill', checked ? unCheckColor : checkColor);
        clickedItem.set('checked', !checked);
      }

      this.get('canvas').draw();
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
    const titleDom = findNodeByClass(legendWrapper, 'g-legend-title');
    const itemListDom = findNodeByClass(legendWrapper, 'g-legend-itemlist');
    const unCheckedColor = self.get('unCheckStyle').fill;
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

    Util.each(items, function(item, index) {
      const checked = item.checked;
      const value = self._formatItemValue(item.name);
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
        originValue: item.name
      });
      const itemDom = DomUtil.createDom(itemDiv);
      const textDom = findNodeByClass(itemDom, 'g-legend-text');
      if (!checked) {
        textDom.style.color = unCheckedColor;
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

    if (self.get('clickable')) {
      const childNodes = itemListDom.childNodes;
      // 注册事件
      legendWrapper.onclick = ev => {
        const target = ev.target;
        let parentDom;
        if (Util.upperCase(target.nodeName) === 'LI') {
          parentDom = target;
        } else {
          parentDom = target.parentNode;
        }
        const textDom = findNodeByClass(parentDom, 'g-legend-text');
        const markerDom = findNodeByClass(parentDom, 'g-legend-marker');
        const clickedItem = findItem(items, parentDom.getAttribute('data-value'));
        const domClass = parentDom.className;
        const originColor = parentDom.getAttribute('data-color');

        if (mode === 'single') { // 单选模式
          // 其他图例项全部置灰
          // TODO：如果外部传入初始状态，则不需要此操作
          Util.each(childNodes, child => {
            if (child !== parentDom) {
              const childTextDom = findNodeByClass(child, 'g-legend-text');
              const childMarkerDom = findNodeByClass(child, 'g-legend-marker');
              childTextDom.style.color = unCheckedColor;
              childMarkerDom.style.backgroundColor = unCheckedColor;
              child.className = Util.replace(child.className, 'checked', 'unChecked');
            } else {
              if (textDom) {
                textDom.style.color = self.get('textStyle').fill;
              }
              if (markerDom) {
                markerDom.style.backgroundColor = originColor;
              }

              parentDom.className = Util.replace(domClass, 'unChecked', 'checked');
            }
          });
        } else { // 混合模式
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
          if (clickedItemChecked) {
            if (textDom) {
              textDom.style.color = unCheckedColor;
            }
            if (markerDom) {
              markerDom.style.backgroundColor = unCheckedColor;
            }

            parentDom.className = Util.replace(domClass, 'checked', 'unChecked');
          } else if (domClass.includes('unChecked')) {
            if (textDom) {
              textDom.style.color = self.get('textStyle').fill;
            }
            if (markerDom) {
              markerDom.style.backgroundColor = originColor;
            }
            parentDom.className = Util.replace(domClass, 'unChecked', 'checked');
          }
        }

        self.trigger('legend:click', [{
          item: clickedItem,
          currentTarget: parentDom,
          checked: (mode === 'single') ? true : !clickedItem.checked
        }]);
      };
    }

    legendWrapper.onmousemove = ev => {
      const target = ev.target;
      let parentDom;
      if (Util.upperCase(target.nodeName) === 'LI') {
        parentDom = target;
      } else {
        parentDom = target.parentNode;
      }
      const hoveredItem = findItem(items, parentDom.getAttribute('data-value'));
      if (hoveredItem) {
        self.trigger('legend:hover', [{
          item: hoveredItem,
          currentTarget: parentDom,
          checked: hoveredItem.checked
        }]); // TODO: 到底是 canvas 还是 legend 对象抛出事件?
      }
    };

    outterNode.appendChild(legendWrapper);
  }

  _renderItems() {
    const self = this;
    const items = self.get('items');
    Util.each(items, function(item, index) {
      self._addItem(item, index);
    });
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
    const unCheckStyle = this.get('unCheckStyle');
    const itemGroup = itemsGroup.addGroup({
      x,
      y,
      value: item.name,
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
        Util.mix(markerAttrs, unCheckStyle);
      }

      const markerShape = itemGroup.addShape('marker', {
        type: 'marker',
        attrs: markerAttrs
      });
      markerShape.set('cursor', 'pointer');
      startX += markerShape.getBBox().width + wordSpace;
    }

    const textAttrs = Util.mix({}, textStyle, {
      x: startX + x,
      y,
      text: this._formatItemValue(item.name)
    });
    if (!item.checked) {
      Util.mix(textAttrs, unCheckStyle);
    }

    const textShape = itemGroup.addShape('text', {
      attrs: textAttrs
    });
    textShape.set('cursor', 'pointer');

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
    wrapperShape.set('cursor', 'pointer');

    itemGroup.name = 'legend-item';
    return itemGroup;
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

  _renderBack() {
    const itemsGroup = this.get('itemsGroup');
    const padding = this.get('backPadding');
    const backAttrs = this.get('background');
    itemsGroup.renderBack(padding, backAttrs);
  }
}

module.exports = Category;
