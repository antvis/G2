/**
 * @fileOverview The class of tail legend
 * @author Ye Liu
 */

const Util = require('../../util');
// const Category = require('./category');
const Components = require('@antv/component/lib');
const Global = require('../../global');
const { Legend } = Components;
const { Category } = Legend;
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
      layout: 'vertical',
      autoLayout: true
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
      const groupMatrix = self.get('group').attr('matrix');
      groupMatrix[7] = 0;
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
        const y = lastY - groupHeight / 2;
        groupItem.translate(x, y);
        index++;
      });

      if (self.get('autoLayout')) {
        self._antiCollision(groups);
      }
    }
  }

  render() {
    super.render();
    const chart = this.get('chart');
    chart.once('afterpaint', () => {
      this._adjust();
    });
  }

  _getPreviousY(item) {
    const y = item.attr('matrix')[7];
    const height = item.getBBox().height;
    return y + height;
  }

  _adjustDenote(group, start, end) {
    const margin = Global.legend.legendMargin;
    const x0 = -2;
    const x2 = -margin * 2;
    group.addShape('path', {
      attrs: {
        path: 'M' + x0 + ',' + start + 'L' + x2 + ',' + (end + 3),
        lineWidth: 1,
        lineDash: [ 2, 2 ],
        stroke: '#999999'
      }
    });
  }

  _antiCollision(items = []) {
    if (!items.length) return;
    const self = this;
    items.sort((a, b) => {
      const ay = a.attr('matrix')[7];
      const by = b.attr('matrix')[7];
      return ay - by;
    });
    let overlapping = true;
    const plotRange = self.get('chart').get('plotRange');
    const startY = plotRange.tl.y;
    const totalHeight = Math.abs(startY - plotRange.bl.y);
    const elementHeight = items[0].getBBox().height;
    let minY = Number.MIN_VALUE;
    let maxY = 0;

    const boxes = items.map(item => {
      const y = item.attr('matrix')[7];
      if (y > maxY) {
        maxY = y;
      }
      if (y < minY) {
        minY = y;
      }
      return {
        size: item.getBBox().height,
        targets: [ y - startY ]
      };
    });
    minY -= startY;

    let i = 0;
    while (overlapping) {
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
        box.pos = Math.min(Math.max(minY, target - box.size / 2), totalHeight - box.size);
      }
      overlapping = false;
      i = boxes.length;
      while (i--) {
        if (i > 0) {
          const previous = boxes[i - 1];
          const current = boxes[i];
          if (previous.pos + previous.size > current.pos) { // overlapping
            previous.size += current.size;
            previous.targets = previous.targets.concat(current.targets);
            boxes.splice(i, 1);
            overlapping = true;
          }
        }
      }// end of while i
    }// end of while
  // adjust y
    i = 0;
    const group = this.get('itemsGroup').addGroup();
    boxes.forEach(b => {
      let posInCompositeBox = startY + elementHeight;
      b.targets.forEach(() => {
        const origin_y = items[i].attr('matrix')[7];
        const y = b.pos + posInCompositeBox - elementHeight / 2;
        const dist = Math.abs(origin_y - y);
        if (dist > elementHeight / 2) {
          self._adjustDenote(group, y, origin_y - self.get('group').attr('matrix')[7] / 2);
        }
        items[i].translate(0, -origin_y);
        items[i].translate(0, y);
        posInCompositeBox += elementHeight;
        i++;
      });
    });
  }// end of antiCollision

}

module.exports = Tail;
