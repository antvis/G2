/**
 * @fileOverview The class of tail legend
 * @author Ye Liu
 */

const Util = require('../../util');
const Category = require('./category');
const Global = require('../../global');

class Tail extends Category {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      /**
       * type标识
       * @type {String}
       */
      type: 'tail-legend',
      /**
       * 布局方式
       * horizontal 水平
       * vertical 垂直
       * @type {String}
       */
      layout: 'vertical'
    });
  }

  _addItem(item) {
    const itemsGroup = this.get('itemsGroup');
    const x = this._getNextX();
    const y = 0;
    const unCheckColor = this.get('unCheckColor');
    const itemGroup = itemsGroup.addGroup({
      x: 0,
      y: 0,
      value: item.value,
      scaleValue: item.scaleValue,
      checked: item.checked
    });
    itemGroup.translate(x, y);
    itemGroup.set('viewId', itemsGroup.get('viewId'));

    const textStyle = this.get('textStyle');
    const wordSpace = this.get('_wordSpaceing');
    let startX = 0;

    if (item.marker) { // 如果有marker添加marker
      const markerAttrs = Util.mix({}, item.marker, {
        x: item.marker.radius,
        y: 0
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
      x: startX,
      y: 0,
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
    this.get('appendInfo') && textShape.setSilent('appendInfo', this.get('appendInfo'));

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
    wrapperShape.setSilent('origin', item); // 保存图例项相关的数据，便于事件操作
    wrapperShape.name = 'legend-item';
    this.get('appendInfo') && wrapperShape.setSilent('appendInfo', this.get('appendInfo'));
    itemGroup.name = 'legendGroup';
    return itemGroup;
  }


  _adjust() {
    const self = this;
    const geom = self.get('geom');
    if (geom) {
      const dataArray = self.get('geom').get('dataArray');
      const groups = this.get('itemsGroup').get('children');
      let index = 0;
      Util.each(groups, groupItem => {
        const dArray = dataArray[index];
        let lastY = dArray[dArray.length - 1].y;
        if (Util.isArray(lastY)) {
          lastY = lastY[1];
        }
        const groupHeight = groupItem.getBBox().height;
        const x = groupItem.get('x');
        const y = lastY - (groupHeight / 2);

        // groupItem.set('y', lastY - groupHeight);
        // adjust y position by previous
        groupItem.translate(x, y);
        index++;
      });
      self._collisionDetection(groups);
    }
  }

  _renderUI() {
    const self = this;
    if (!self.get('useHtml')) {
      // super._renderUI();
      self._renderItems();
      self.get('autoWrap') && self._adjustItems(); // 默认自动换行
      self._renderBack();
    } else { // 使用 html 渲染图例
      self._renderHTML();
    }
    const chart = self.get('chart');
    chart.once('afterpaint', function() {
      self._adjust();
    });
  }

  _getPreviousY(item) {
    const y = item.attr('matrix')[7];
    const height = item.getBBox().height;
    return y + height;
  }

  _collisionDetection(items) {
    const group = this.get('itemsGroup');
    items.sort(function(a, b) {
      const ay = a.attr('matrix')[7];
      const by = b.attr('matrix')[7];
      return by - ay;
    });
    for (let i = 1; i < items.length; i++) {
      const previous = items[i - 1];
      const previous_y = previous.attr('matrix')[7] - previous.getBBox().height;
      const current = items[i];
      const current_y = current.attr('matrix')[7];
      if (current_y >= previous_y && current.get('value')) { // collision
        const target = previous_y - 20;
        const gap = current_y - target;
        current.translate(0, gap);
        this._adjustDenote(group, current.attr('matrix')[7], current_y);
      }
    }
  }

  _adjustDenote(group, start, end) {
    const viewTheme = this.get('viewTheme') || Global;
    const margin = viewTheme.legend.legendMargin - 2;
    const x0 = -2;
    const x1 = -margin;
    const x2 = -margin * 2;
    group.addShape('path', {
      attrs: {
        path: 'M' + x0 + ',' + start + 'L' + x1 + ',' + (end + 3) + 'L' + x2 + ',' + (end + 3),
        lineWidth: 1,
        lineDash: [ 2, 2 ],
        stroke: '#999999'
      }
    });
  }

}

module.exports = Tail;
