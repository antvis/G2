const Util = require('../../util');
const { Group, DomUtil } = require('@ali/g');
const TITLE_CLASS = 'g2-tooltip-title';
const LIST_CLASS = 'g2-tooltip-list';

function find(dom, cls) {
  return dom.getElementsByClassName(cls)[0];
}

function isInPlot(range, point) {
  const { tl, br } = range;
  const { x, y } = point;
  const result = {};
  result.inPlot = (x >= tl.x && x <= br.x && y >= tl.y && y <= br.y);
  result.inHorizontal = (x >= tl.x && x <= br.x);
  result.inVertical = (y >= tl.y && y <= br.y);

  return result;
}

class Tooltip extends Group {
  getDefaultCfg() {
    return {
      zIndex: 10,
      x: 0, // @type {Number} x 右下角坐标
      y: 0, // @type {Number} y 右下角坐标
      items: null, // @type {Array} tooltip 子项
      showTitle: true, // 是否展示 title
      titleContent: undefined, // @type {String} 默认标题文本
      crosshairs: null, // @type {Boolean} 是否贯穿整个坐标轴
      crossLineShapeX: null, // @type {Shape} X标记线图形
      crossLineShapeY: null, // @type {Shape} Y标记线图形
      plotRange: null, // @type {Object} 视图范围
      offset: 10, // @type {Number} x轴上，移动到位置的偏移量
      animate: true, // @type {Boolean} 是否开启动画
      duration: 50, // @type {Number} 移动的动画时间
      container: null, // @type {Boolean} 是否自定义HTML
      timeStamp: 0, // @type {Nmuber} 时间戳
      // @type {String} 使用html时的外层模板
      html: '<div class="g2-tooltip" style="position:absolute;visibility:hidden;border-style:solid;white-space:nowrap;z-index:9999999;transition:left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);background-color:rgba(50, 50, 50, 0.7);border-width:0px;border-color:rgb(51, 51, 51);border-radius:4px;color:rgb(255, 255, 255);font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:14px;font-family:sans-serif;line-height:21px;padding:5px 10px;"><div class="' + TITLE_CLASS + '" style="margin:10px 0;"></div>'
       + '<ul class="' + LIST_CLASS + '" style="margin:10px 0;list-style-type:none;padding:0;"></ul></div>',
      // @type {String} 使用html时，单个选项的模板
      itemTpl: '<li data-index=${ index }><span style="background-color:${color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>${ name }: ${ value }</li>',
      inPlot: true
    };
  }

  _setTooltipWrapper() {
    const self = this;
    const html = self.get('html');
    const outterNode = self.get('canvas').get('el').parentNode;
    let container;
    if (/^\#/.test(html)) { // 如果传入 dom 节点的 id
      const id = html.replace('#', '');
      container = document.getElementById(id);
    } else {
      container = DomUtil.createDom(html);
    }
    self.set('container', container);
    outterNode.appendChild(container);
    outterNode.style.position = 'relative';
  }

  _beforeRenderUI() {
    // const { style } = this.get('crosshairs'); // tooltip 十字准线样式
    const crosshairs = this.get('crosshairs');
    if (crosshairs && crosshairs.type === 'rect') {
      Util.defaultsDeep(this.get('crosshairs'), {
        style: {
          fill: '#CCD7EB',
          opacity: 0.4,
          lineWidth: 0
        }
      });
    } else {
      Util.defaultsDeep(this.get('crosshairs'), {
        style: {
          stroke: '#666',
          lineWidth: 1
        }
      });
    }

    const crosshairsGroup = this.addGroup({
      zIndex: 0
    });

    this.set('crosshairsGroup', crosshairsGroup);
    this._setTooltipWrapper();
  }

  _renderUI() {
    if (this.get('items')) {
      this._renderTooltip();
    }
    this._renderCrosshairs();
  }

  _clearDom() {
    const container = this.get('container');
    const titleDom = find(container, TITLE_CLASS);
    const listDom = find(container, LIST_CLASS);
    if (titleDom) {
      titleDom.innerHTML = '';
    }
    if (listDom) {
      listDom.innerHTML = '';
    }
  }

  _addItem(item, index) {
    const container = this.get('container');
    const listDom = find(container, LIST_CLASS);
    const itemTpl = this.get('itemTpl'); // TODO: 有可能是个回调函数
    // item.index = index;

    const itemTplCompiler = Util.template(itemTpl);
    const itemDiv = itemTplCompiler({
      index,
      color: item.color,
      value: item.value,
      name: item.name
    });

    const itemDOM = DomUtil.createDom(itemDiv);
    listDom.appendChild(itemDOM);
  }

  _renderTooltip() {
    const self = this;
    const showTitle = self.get('showTitle');
    const titleContent = self.get('titleContent');
    const container = self.get('container');
    const titleDom = find(container, TITLE_CLASS);
    const listDom = find(container, LIST_CLASS);
    const items = self.get('items');
    self._clearDom();

    if (titleDom && showTitle) {
      titleDom.innerHTML = titleContent;
    }

    if (listDom) {
      Util.each(items, (item, index) => {
        self._addItem(item, index);
      });
    }
  }

  _clearCrosshairsGroup() {
    const crosshairsGroup = this.get('crosshairsGroup');
    this.set('crossLineShapeX', null);
    this.set('crossLineShapeY', null);
    crosshairsGroup.clear();
  }

  _renderCrosshairs() {
    const crosshairs = this.get('crosshairs');
    const canvas = this.get('canvas');
    const plotRange = this.get('plotRange');
    if (crosshairs) {
      this._clearCrosshairsGroup();
      switch (crosshairs.type) {
        case 'x':
          this._renderHorizontalLine(canvas, plotRange);
          break;
        case 'y':
          this._renderVerticalLine(canvas, plotRange);
          break;
        case 'cross':
          this._renderHorizontalLine(canvas, plotRange);
          this._renderVerticalLine(canvas, plotRange);
          break;
        case 'rect':
          this._renderBackground(canvas, plotRange);
          break;
        default:
          this._renderVerticalLine(canvas, plotRange);
      }
    }
  }

  _addCrossLineShape(attrs, type) {
    const crosshairsGroup = this.get('crosshairsGroup');
    const shape = crosshairsGroup.addShape('line', {
      attrs
    });
    this.set('crossLineShape' + type, shape);
    return shape;
  }

  _renderVerticalLine(canvas, plotRange) {
    const { style } = this.get('crosshairs');
    const attrs = Util.mix({
      x1: 0,
      y1: plotRange ? plotRange.bl.y : canvas.get('height'),
      x2: 0,
      y2: plotRange ? plotRange.tl.y : 0
    }, style);

    this._addCrossLineShape(attrs, 'Y');
  }

  _renderHorizontalLine(canvas, plotRange) {
    const { style } = this.get('crosshairs');
    const attrs = Util.mix({
      x1: plotRange ? plotRange.bl.x : canvas.get('width'),
      y1: 0,
      x2: plotRange ? plotRange.br.x : 0,
      y2: 0
    }, style);

    this._addCrossLineShape(attrs, 'X');
  }

  _renderBackground(canvas, plotRange) {
    const { style } = this.get('crosshairs');
    const attrs = Util.mix({
      x: plotRange ? plotRange.tl.x : 0,
      y: plotRange ? plotRange.tl.y : canvas.get('height'),
      width: plotRange ? plotRange.br.x - plotRange.bl.x : canvas.get('width'),
      height: plotRange ? Math.abs(plotRange.tl.y - plotRange.bl.y) : canvas.get('height')
    }, style);

    const plotBack = this.get('plotBack');
    const shape = plotBack.addShape('rect', {
      attrs
    });
    shape.hide();
    this.set('crosshairsRectShape', shape);
    return shape;
  }

  _isContentChange(title, items) {
    const titleContent = this.get('titleContent');
    const lastItems = this.get('items');
    let isChanged = !(title === titleContent && lastItems.length === items.length);
    if (!isChanged) {
      Util.each(items, (item, index) => {
        const preItem = lastItems[index];
        isChanged = (item.value !== preItem.value) || (item.color !== preItem.color) || (item.name !== preItem.name) || (item.title !== preItem.title);
        if (isChanged) {
          return false;
        }
      });
    }

    return isChanged;
  }

  setContent(title, items) {
    const isChange = this._isContentChange(title, items);
    if (isChange) {
      const timeStamp = +new Date();
      this.set('items', items);
      this.set('titleContent', title);
      this.set('timeStamp', timeStamp);
      this._renderTooltip();
    }
    return this;
  }

  setMarkers(markerItems, markerCfg) {
    const self = this;
    let markerGroup = self.get('markerGroup');
    if (!markerGroup) {
      markerGroup = self.addGroup({
        zIndex: 1
      });
      self.set('markerGroup', markerGroup);
    } else {
      markerGroup.clear();
    }

    Util.each(markerItems, item => {
      markerGroup.addShape('marker', {
        attrs: Util.mix({}, markerCfg, {
          stroke: item.color,
          x: item.x,
          y: item.y
        })
      });
    });
  }

  setPosition(x, y, isFixed) {
    const container = this.get('container');
    let offset = this.get('offset');
    const crossLineShapeX = this.get('crossLineShapeX');
    const crossLineShapeY = this.get('crossLineShapeY');
    const crosshairsRectShape = this.get('crosshairsRectShape');
    // const animate = this.get('animate');
    let after = true;
    const endx = x;
    const endy = y;
    const containerWidth = DomUtil.getWidth(container);
    const containerHeight = DomUtil.getHeight(container);

    if (isFixed) {
      x = x - containerWidth / 2;
      y = y - containerHeight - offset;
    } else {
      const width = containerWidth + 2 * offset;
      x = x - width;
      y = y - containerHeight - 2 * offset;
    }

    if (this.get('inPlot')) { // 限定必须展示在图表绘图区域内
      const plotRange = this.get('plotRange');
      const point = {
        x,
        y
      };
      const inPlot = isInPlot(plotRange, point);

      if (!inPlot.inPlot) {
        if (!inPlot.inHorizontal) {
          if ((plotRange.tr.x - plotRange.tl.x) >= 2 * containerWidth) {
            x = Math.max(plotRange.tl.x, endx) + offset;
            after = false;
          } else {
            x = plotRange.tl.x;
            y -= offset;
          }
        }

        if (!inPlot.inVertical) {
          y = plotRange.tl.y;
        }
      }
    }

    if (this.get('x') !== x || this.get('y') !== y) {
      if (crossLineShapeY) { // 第一次进入时，画布需要单独绘制，所以需要先设定corss的位置
        if (after) {
          crossLineShapeY.move(endx, 0);
        } else {
          crossLineShapeY.move((x - offset), 0);
        }
      }
      if (crossLineShapeX) {
        crossLineShapeX.move(0, endy);
      }

      if (crosshairsRectShape) {
        const items = this.get('items');
        const firstItem = items[0];
        offset = (firstItem.size / 2 + firstItem.size / 4) || 10;
        crosshairsRectShape.attr('x', firstItem.point.x - offset);

        if (items.length === 1) {
          crosshairsRectShape.attr('width', firstItem.size + firstItem.size / 2); // TODO: 获取柱子的宽度
        } else {
          const lastItem = items[items.length - 1];
          crosshairsRectShape.attr('width', lastItem.point.x - firstItem.point.x + 2 * offset);
        }
      }

      container.style.left = x + 'px';
      container.style.top = y + 'px';
    }
  }

  show() {
    const crossLineShapeX = this.get('crossLineShapeX');
    const crossLineShapeY = this.get('crossLineShapeY');
    const crosshairsRectShape = this.get('crosshairsRectShape');
    const markerGroup = this.get('markerGroup');
    const container = this.get('container');
    const hideHandler = this.get('hideHandler');
    const canvas = this.get('canvas');
    if (hideHandler) {
      clearTimeout(hideHandler);
    }
    crossLineShapeX && crossLineShapeX.show();
    crossLineShapeY && crossLineShapeY.show();
    crosshairsRectShape && crosshairsRectShape.show();
    markerGroup && markerGroup.show();
    super.show();
    container.style.visibility = 'visible';
    this.sort();
    canvas.draw();
  }

  hide() {
    const self = this;
    const container = self.get('container');
    const crossLineShapeX = self.get('crossLineShapeX');
    const crossLineShapeY = self.get('crossLineShapeY');
    const crosshairsRectShape = this.get('crosshairsRectShape');
    const markerGroup = self.get('markerGroup');
    const canvas = self.get('canvas');
    const hideHandler = setTimeout(function() {
      container.style.visibility = 'hidden';
      self.set('hideHandler', null);
      if (!self.get('destroyed')) {
        Tooltip.superclass.hide.call(self);
        canvas.draw();
      }
    }, self.get('duration'));
    self.set('hideHandler', hideHandler);
    crossLineShapeX && crossLineShapeX.hide();
    crossLineShapeY && crossLineShapeY.hide();
    crosshairsRectShape && crosshairsRectShape.hide();
    markerGroup && markerGroup.hide();
  }

  remove() {
    const self = this;
    const crossLineShapeX = self.get('crossLineShapeX');
    const crossLineShapeY = self.get('crossLineShapeY');
    const markerGroup = self.get('markerGroup');
    const crosshairsRectShape = self.get('crosshairsRectShape');
    const container = self.get('container');
    const html = self.get('html');

    crossLineShapeX && crossLineShapeX.remove();
    crossLineShapeY && crossLineShapeY.remove();
    markerGroup && markerGroup.remove();
    crosshairsRectShape && crosshairsRectShape.remove();
    super.remove();

    if (container && !(/^\#/.test(html))) {
      container.parentNode.removeChild(container);
    }
  }
}

module.exports = Tooltip;
