const Util = require('../../util');
const { Group } = require('@ali/g');

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
       * 水平方向布局，可取值 left middle right
       * @type {String}
       */
      alignX: 'right',
      /**
       * 垂直方向布局，可取值 top middle bottom
       * @type {String}
       */
      alignY: 'bottom',
      /**
       * 水平方向偏移
       * @type {Number}
       */
      offsetX: 0,
      /**
       * 垂直方向偏移
       * @type {Number}
       */
      offsetY: 0,
      /**
       * 是否使用 html 进行渲染
       * @type {Boolean}
       */
      useHtml: false,
      /**
       * 图例是否绘制在绘图区域内
       * @type {Boolean}
       */
      inPlot: false,
      zIndex: 1
    };
  }

  _beforeRenderUI() {
    this.set('itemsGroup', this.addGroup());
  }

  _renderUI() {
    this._renderTitle();
  }

  _renderTitle() {
    const title = this.get('title');
    if (title && title.text) {
      this.set('titleShape', this.addShape('text', {
        attrs: Util.mix({
          x: 0,
          y: 0
        }, title)
      }));
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
