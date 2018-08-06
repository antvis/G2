/**
 * @fileOverview The base class of legend
 * @author sima.zhang
 */
const Util = require('../../util');
const { Group } = require('../../renderer');
const Global = require('../../global');

class Base extends Group {
  getDefaultCfg() {
    return {
      /**
       * 图例标题配置
       * @type {Object}
       */
      title: {
        fill: '#333',
        textBaseline: 'middle'
      },
      /**
       * 图例项文本格式化
       * @type {Function}
       */
      itemFormatter: null,
      /**
       * 是否使用 html 进行渲染
       * @type {Boolean}
       */
      useHtml: false,
      /**
       * useHtml 为 true 时生效，用于自动定位
       * @type {[type]}
       */
      autoPosition: true,
      /**
       * 图例是否绘制在绘图区域内
       * @type {Boolean}
       */
      inPlot: false,
      /**
       * 鼠标 hover 到图例上的默认交互是否开启
       * @type {Boolean}
       */
      hoverable: true
    };
  }

  _beforeRenderUI() {
    const group = this.addGroup();
    group.set('viewId', this.get('viewId'));
    this.set('itemsGroup', group);
  }

  _renderUI() {
    this._renderTitle();
  }

  _renderTitle() {
    const title = this.get('title');
    const viewTheme = this.get('viewTheme') || Global;
    if (title && title.text) {
      const titleShape = this.addShape('text', {
        attrs: Util.mix({
          x: 0,
          y: 0,
          fill: '#333', // 默认样式
          textBaseline: 'middle',
          fontFamily: viewTheme.fontFamily
        }, title)
      });
      titleShape.name = 'legend-title';
      this.get('appendInfo') && titleShape.setSilent('appendInfo', this.get('appendInfo'));
      this.set('titleShape', titleShape);
    }
  }

  getCheckedCount() {
    const itemsGroup = this.get('itemsGroup');
    const items = itemsGroup.get('children');
    const checkedArr = Util.filter(items, function(item) {
      return item.get('checked');
    });
    return checkedArr.length;
  }

  setItems(items) {
    this.set('items', items);
    this.clearItems();
    this._renderUI();
  }

  addItem(item) {
    const items = this.get('items');
    items.push(item);
    this.clearItems();
    this._renderUI();
  }

  clearItems() {
    const itemsGroup = this.get('itemsGroup');
    itemsGroup.clear();
  }

  getWidth() {
    const bbox = this.getBBox();
    return bbox.width;
  }

  getHeight() {
    const bbox = this.getBBox();
    return bbox.height;
  }
}

module.exports = Base;
