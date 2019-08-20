import CategoryBase from './base';
import { BBox, Event, Group, Rect } from '@antv/g';
import Arrow from './arrow';
import { each, filter, wrapBehavior, isNumber, clone, mix } from '@antv/util';
import { GroupType, LegendItem, EventType, CanvasCategoryLegendCfg } from '../../interface';

export default class CanvasLegend extends CategoryBase {
  maxWidth: number;
  maxHeight: number;
  isFlipped: boolean;
  flipUI: any;

  constructor(cfg: CanvasCategoryLegendCfg) {
    super({
      type: 'category-legend',
      ...cfg,
    });
  }

  init() {
    this.isFlipped = false;
    const container = this.get('container');
    this.set('canvas', container.get('canvas'));
    const itemsGroup = container.addGroup();
    this.set('itemsGroup', itemsGroup);
    this.get('flipPage') && this.set('autoWrap', true);
  }

  renderTitle() {
    const title = this.get('title');
    if (title) {
      const container = this.get('container');
      const titleStyle = this.get('titleStyle');
      const titleShape = container.addShape('text', {
        attrs: {
          x: 0,
          y: 0,
          text: title,
          ...titleStyle,
        },
      });
      titleShape.name = 'legend-title';
      this.set('titleShape', titleShape);
    }
  }

  renderItems(): void {
    const items = this.get('items');
    if (this.get('reversed')) {
      items.reverse();
    }
    each(items, (item: LegendItem) => {
      this._addItem(item);
    });
    this.get('autoWrap') && this._adjustItems(); // 默认自动换行
    const { maxItemWidth, maxItemHeight } = this._getMaxItemSize();
    this.set('maxItemWidth', maxItemWidth);
    this.set('maxItemHeight', maxItemHeight);
    const needPageFlip = this.isNeedFlip();
    if (needPageFlip) {
      this.flipPage();
    }
    this._adjustPositionOffset();
    this._renderBack();
  }

  isNeedFlip(): Boolean {
    const maxWidth = this.get('maxWidth');
    const maxItemHeight = this.get('maxItemHeight');
    const itemsBBox = this.get('itemsGroup').getBBox();
    const layout = this.get('layout');
    if (this.get('flipPage')) {
      if (layout === 'vertical' && maxWidth < itemsBBox.width) {
        return true;
      }

      if (layout === 'horizontal' && maxItemHeight < itemsBBox.height) {
        return true;
      }
    }
    return false;
  }

  flipPage(): void {
    this.isFlipped = true;
    const maxItemWidth = this.get('maxItemWidth');
    const maxItemHeight = this.get('maxItemHeight');
    const maxWidth = this.get('maxWidth');
    const maxHeight = this.get('maxHeight');
    const itemsGroup = this.get('itemsGroup');
    const itemsBBox = itemsGroup.getBBox();
    const layout = this.get('layout');
    // 根据layout创建clip
    let pageNumber = 0;
    let mode = 'up-down'; // 上下翻页
    let x = itemsBBox.tl.x;
    let y = itemsBBox.tl.y; // 翻页器位置
    let size = 0; // 翻页器尺寸
    const clip = new Rect({
      attrs: {
        x,
        y,
        width: maxWidth,
        height: maxHeight,
      },
    });
    if (layout === 'horizontal') {
      const width = Math.max(maxWidth, itemsBBox.width);
      clip.attr('width', width);
      clip.attr('height', maxItemHeight);
      this.set('maxWidth', width);
      this.set('maxHeight', maxItemHeight);
      pageNumber = Math.ceil(itemsBBox.height / (maxItemHeight + this.get('itemMarginBottom')));
      x = x + width - this._getPaginationCfg().size; // temp:padding
      y = y + maxItemHeight / 2;
      size = maxItemHeight;
    }
    if (layout === 'vertical') {

      clip.attr('width', maxItemWidth);
      const height = Math.max(maxHeight, itemsBBox.height);
      clip.attr('height', height);
      this.set('maxWidth', maxItemWidth);
      this.set('maxHeight', height);
      pageNumber = Math.ceil(itemsBBox.width / (maxItemWidth + this.get('itemDistance')));
      y = y + height + 10; // temp: padding
      mode = 'left-right';
      size = maxItemWidth;
    }
    // 应用clip
    itemsGroup.attr('clip', clip);
    // 绘制翻页器UI
    const flipUI = this.flipPageUI(x, y, size, pageNumber, mode);
    this.flipUI = flipUI;
    // 加入交互
    let currentIndex = 1;
    const arrow1 = flipUI.arrows[0];
    const arrow2 = flipUI.arrows[1];
    arrow1.on('click', () => {
      if (currentIndex > 1) {
        currentIndex -= 1;
        flipUI.text.attr('text', `${currentIndex} / ${pageNumber}`);
        const matrix = clone(itemsGroup.attr('matrix'));
        if (layout === 'vertical') {
          const dist = this.get('itemDistance') + maxItemWidth;
          matrix[6] += dist;
        } else {
          const dist = maxItemHeight + this.get('itemMarginBottom');
          matrix[7] += dist;
        }
        itemsGroup.stopAnimate();
        itemsGroup.animate({
          matrix,
        },                 100);
        this.get('canvas').draw();
      }
    });
    arrow2.on('click', () => {
      if (currentIndex < pageNumber) {
        currentIndex += 1;
        flipUI.text.attr('text', `${currentIndex} / ${pageNumber}`);
        const matrix = clone(itemsGroup.attr('matrix'));
        if (layout === 'vertical') {
          const dist = this.get('itemDistance') + maxItemWidth;
          matrix[6] -= dist;
        } else {
          const dist = maxItemHeight + this.get('itemMarginBottom');
          matrix[7] -= dist;
        }
        itemsGroup.stopAnimate();
        itemsGroup.animate({
          matrix,
        },                 100);
      }
    });
  }

  flipPageUI(x, y, size, pageNumber, mode) {
    const paginationCfg = this._getPaginationCfg();
    const container = this.get('container');
    const group = container.addGroup();
    const arrows = [];
    let text;
    if (mode === 'left-right') {
      // left arrow
      const la = new Arrow(
        mix({}, paginationCfg.arrow, {
          x: x + paginationCfg.arrow.width / 2,
          y,
          direction: 'left',
        } as any),
      );
      group.add(la.shape);
      arrows.push(la.shape);
      // right arrow
      const ra = new Arrow(
        mix({}, paginationCfg.arrow, {
          x: x + size - paginationCfg.arrow.width / 2,
          y,
          direction: 'right',
        } as any),
      );
      group.add(ra.shape);
      arrows.push(ra.shape);
      // text
      text = group.addShape('text', {
        attrs: mix({}, paginationCfg.text, {
          x: x + size / 2,
          y,
          text: `1 / ${pageNumber}`,
        } as any),
      });
    } else {
      // upper arrow
      const ua = new Arrow(
        mix({}, paginationCfg.arrow, {
          x,
          y: y - size,
          direction: 'up',
        } as any),
      );
      group.add(ua.shape);
      arrows.push(ua.shape);
      // lower arrow
      const da = new Arrow(
        mix({}, paginationCfg.arrow, {
          x,
          y: y + size,
          direction: 'down',
        } as any),
      );
      group.add(da.shape);
      arrows.push(da.shape);
      // text
      text = group.addShape('text', {
        attrs: mix({}, paginationCfg.text, {
          x, y,
          text: `1 / ${pageNumber}`,
        } as any),
      });
    }

    return {
      arrows,
      text,
      container: group,
    };
  }

  _getPaginationCfg() {
    const defaultCfg = {
      arrow: {
        x: 0,
        y: 0,
        width: 10,
        height: 8,
        attrs: {
          fill: '#ccc',
          cursor: 'pointer',
        },
        direction: 'right',
      },
      text: {
        fontSize: 12,
        fill: '#ccc',
        textAlign: 'center',
        textBaseline: 'middle',
      },
      size: 40,
    };
    // todo: 允许用户自行配置样式
    return defaultCfg;
  }

  bindEvents(): void {
    const itemsGroup = this.get('itemsGroup');
    if (this.get('hoverable')) {
      itemsGroup.on('mousemove', wrapBehavior(this, '_onMousemove'));
      itemsGroup.on('mouseleave', wrapBehavior(this, '_onMouseleave'));
    }

    if (this.get('clickable')) {
      itemsGroup.on('click', wrapBehavior(this, '_onClick'));
    }
  }
  /**
   * 清空容器
   */
  clear() {
    const container = this.get('container');
    if (container && !container.destroyed) {
      container.clear();
    }
  }

  /**
   * 销毁
   */
  destroy() {
    super.destroy();
    const container = this.get('container');
    if (container && !container.destroyed) {
      if (container.get('parent')) {
        container.remove();
      }
      container.destroy();
    }
  }

  getCheckedCount() {
    const itemsGroup = this.get('itemsGroup');
    const items = itemsGroup.get('children');
    const checkedArr = filter(items, (item: GroupType) => {
      return item.get('checked');
    });
    return checkedArr.length;
  }

  getWidth() {
    if (this.isFlipped) {
      const fliperContainer = this.flipUI.container;
      return this.get('maxWidth') + fliperContainer.getBBox().width; // bbox width取不准
    }
    const container = this.get('container');
    const bbox = container.getBBox();
    return bbox.width + 2;
  }

  getHeight() {
    if (this.isFlipped) {
      const fliperContainer = this.flipUI.container;
      if (this.get('layout') === 'horizontal') {
        return Math.max(this.get('maxHeight'), fliperContainer.getBBox().height);
      }
      return this.get('maxHeight') + fliperContainer.getBBox().height;

    }
    const container = this.get('container');
    const bbox = container.getBBox();
    return bbox.height;
  }

  private _adjustPositionOffset(): void {
    const offsetX = this.get('offsetX');
    const offsetY = this.get('offsetY');
    const container = this.get('container');
    container.move(offsetX, offsetY);
  }

  private _addItem(item: LegendItem): void {
    const itemsGroup = this.get('itemsGroup');
    const x = this._getNextX();
    const y = this._getNextY();
    const unSelectedColor = this.get('unSelectedColor');
    const itemGroup = itemsGroup.addGroup({
      x,
      y,
      value: item.value,
      checked: item.checked,
    });
    const textStyle = this.get('textStyle');
    const wordSpace = this.get('wordSpacing');
    let startX = 0;
    if (item.marker) {
      // 如果有marker添加marker
      const markerAttrs = Object.assign({}, item.marker, {
        x: item.marker.radius + x,
        y,
      });

      if (!item.checked) {
        if (markerAttrs.fill) {
          markerAttrs.fill = unSelectedColor;
        }
        if (markerAttrs.stroke) {
          markerAttrs.stroke = unSelectedColor;
        }
      }

      const markerShape = itemGroup.addShape('marker', {
        type: 'marker',
        attrs: markerAttrs,
      });
      markerShape.attr('cursor', 'pointer');
      markerShape.name = 'legend-marker';
      startX += markerShape.getBBox().width + wordSpace;
    }
    const textAttrs = Object.assign({}, textStyle, {
      x: startX + x,
      y: y - (item.marker ? item.marker.radius / 2 : 0) + textStyle.fontSize / 4,
      text: this.formatterValue(item.value),
    });
    if (!item.checked) {
      Object.assign(textAttrs, {
        fill: unSelectedColor,
      });
    }

    const textShape = itemGroup.addShape('text', {
      attrs: textAttrs,
    });
    textShape.attr('cursor', 'pointer');
    textShape.name = 'legend-text';

    const bbox = itemGroup.getBBox();
    const itemWidth = this.get('itemWidth');
    const wrapperShape = itemGroup.addShape('rect', {
      attrs: {
        x,
        y: y - bbox.height / 2,
        fill: '#fff',
        fillOpacity: 0,
        width: itemWidth || bbox.width,
        height: bbox.height,
      },
    });
    wrapperShape.attr('cursor', 'pointer');
    wrapperShape.set('origin', item); // 保存图例项相关的数据，便于事件操作
    wrapperShape.name = 'legend-item';
    itemGroup.name = 'legendGroup';
    return itemGroup;
  }

  // 获取的图例元素 X 位置
  private _getNextX(): number {
    const layout = this.get('layout');
    const itemDistance = this.get('itemDistance');
    const itemsGroup = this.get('itemsGroup');
    const itemWidth = this.get('itemWidth');
    const children = itemsGroup.get('children');
    let nextX = 0;
    if (layout === 'horizontal') {
      // 水平布局
      each(children, (item: GroupType) => {
        nextX += (itemWidth ? itemWidth : item.getBBox().width) + itemDistance;
      });
    }
    return nextX;
  }

  private _getNextY(): number {
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleDistance = this.get('titleDistance');
    const layout = this.get('layout');
    const itemsGroup = this.get('itemsGroup');
    const titleShape = this.get('titleShape');
    const children = itemsGroup.get('children');
    let nextY = titleDistance;
    if (titleShape) {
      nextY += titleShape.getBBox().height;
    }
    if (layout === 'vertical') {
      // 竖直布局
      each(children, (item: GroupType) => {
        nextY += item.getBBox().height + itemMarginBottom;
      });
    }
    return nextY;
  }

  private _adjustHorizontal(): void {
    const margin = this.flipPage ? this._getPaginationCfg().size : 0;
    const itemsGroup = this.get('itemsGroup');
    const children = itemsGroup.get('children');
    const maxLength = this.get('maxWidth') - margin;
    const itemDistance = this.get('itemDistance');
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleDistance = this.get('titleDistance');
    let row: number = 0;
    let rowLength: number = 0;
    let width: number;
    let height: number;
    let box: BBox;
    const itemWidth = this.get('itemWidth');
    if (itemsGroup.getBBox().width > maxLength) {
      each(children, (child: GroupType) => {
        box = child.getBBox();
        width = itemWidth || box.width;
        height = box.height + itemMarginBottom;
        if (maxLength - rowLength < width) {
          row++;
          rowLength = 0;
        }
        child.move(rowLength, row * height + titleDistance);
        rowLength += width + itemDistance;
      });
    }
    return;
  }

  private _adjustVertical() {
    let { maxItemWidth } = this._getMaxItemSize();
    const itemsGroup = this.get('itemsGroup');
    const titleShape = this.get('titleShape');
    const children = itemsGroup.get('children');
    const maxLength = this.get('maxLength'); // 垂直布局，则 maxLength 代表容器的高度
    const itemDistance = this.get('itemDistance');
    const itemMarginBottom = this.get('itemMarginBottom');
    const titleDisatance = this.get('titleDistance');
    const titleHeight = titleShape
      ? titleShape.getBBox().height + titleDisatance
      : 0;
    const itemWidth = this.get('itemWidth') ? this.get('itemWidth') : 0;
    let colLength = titleHeight + itemsGroup.getBBox().height;
    let width;
    let height;
    let box;
    maxItemWidth = Math.max(maxItemWidth, itemWidth) + itemDistance;
    let totalLength = 0;
    if (colLength > maxLength) {
      each(children, (child: GroupType, index: Number) => {
        box = child.getBBox();
        width = box.width;
        height = box.height;
        /*if (index > 0) {
          maxItemWidth = itemWidth + itemDistance;
        }*/
        if (maxLength - colLength < height) { // 剩余高度不能满足一行，增加一列
          colLength = titleHeight;
          if (index > 0) totalLength += maxItemWidth;
          child.move(totalLength, titleHeight);
        } else {
          child.move(totalLength, colLength);
        }

        colLength += height + itemMarginBottom;
      });
    }
  }

  private _adjustItems() {
    const layout = this.get('layout');
    layout === 'horizontal' ? this._adjustHorizontal() : this._adjustVertical();
  }

  private _renderBack() {
    const container = this.get('container');
    let padding = this.get('backgroundPadding');
    const backAttrs = this.get('backgroundStyle');
    if (isNumber(padding)) {
      padding = [ padding, padding, padding, padding ];
    }
    if (!backAttrs) return;
    container.renderBack(padding, backAttrs);

  }

  private _onMousemove(ev: EventType): void {
    const item = this._getLegendItem(ev.target);
    if (item && item.get('checked')) {
      const itemMouseover: EventType = new Event('itemmouseover', ev, true, true);
      itemMouseover.item = this._findItem(item);
      itemMouseover.checked = item.get('checked');
      this.emit('itemmouseover', itemMouseover);
      this.get('canvas').draw();
    }
  }

  private _onMouseleave(ev: EventType) {
    const item = this._getLegendItem(ev.target);
    if (item && item.get('checked')) {
      const itemMouseleave: EventType = new Event('itemmouseleave', ev, true, true);
      itemMouseleave.item = this._findItem(item);
      itemMouseleave.checked = item.get('checked');
      this.emit('itemmouseleave', itemMouseleave);

      this.get('canvas').draw();
    }
  }

  private _onClick(ev: EventType) {
    const clickedItem = this._getLegendItem(ev.target);
    if (clickedItem && !clickedItem.get('destroyed')) {
      const checked = clickedItem.get('checked');
      if (!this.get('allowAllCanceled') && checked && this.getCheckedCount() === 1) {
        return;
      }
      const mode = this.get('selectedMode');
      const item = this._findItem(clickedItem);
      const itemClick: EventType = new Event('itemclick', ev, true, true);
      itemClick.item = item;
      itemClick.currentTarget = clickedItem;
      itemClick.checked = (mode === 'single') ? true : !checked;
      const unSelectedColor = this.get('unSelectedColor');
      const checkColor = this.get('textStyle').fill;
      let markerItem;
      let textItem;
      let legendItem;
      if (mode === 'single') {
        const itemsGroup = this.get('itemsGroup');
        const children = itemsGroup.get('children');
        each(children, (child: GroupType) => {
          markerItem = this._findShapeByName(child, 'legend-marker');
          textItem = this._findShapeByName(child, 'legend-text');
          legendItem = this._findShapeByName(child, 'legend-item');
          if (child !== clickedItem) {
            if (markerItem.attr('fill')) {
              markerItem.attr('fill', unSelectedColor);
            }
            if (markerItem.attr('stroke')) {
              markerItem.attr('stroke', unSelectedColor);
            }
            textItem.attr('fill', unSelectedColor);
            markerItem.set('checked', false);
            markerItem.set('rawAttrs', { ...markerItem.get('attrs') });
            textItem.set('checked', false);
            legendItem.set('checked', false);
            child.set('checked', false);
          } else {
            if (markerItem.attr('fill')) {
              markerItem.attr('fill', item.marker.fill);
            }
            if (markerItem.attr('stroke')) {
              markerItem.attr('stroke', item.marker.stroke);
            }
            textItem.attr('fill', checkColor);
            markerItem.set('rawAttrs', { ...markerItem.get('attrs') });
            markerItem.set('checked', true);
            textItem.set('checked', true);
            legendItem.set('checked', true);
            child.set('checked', true);
          }
        });
      } else {
        markerItem = this._findShapeByName(clickedItem, 'legend-marker');
        textItem = this._findShapeByName(clickedItem, 'legend-text');
        legendItem = this._findShapeByName(clickedItem, 'legend-item');
        if (markerItem.attr('fill')) {
          markerItem.attr('fill', checked ? unSelectedColor : item.marker.fill);
        }
        if (markerItem.attr('stroke')) {
          markerItem.attr('stroke', checked ? unSelectedColor : item.marker.stroke);
        }
        textItem.attr('fill', checked ? unSelectedColor : checkColor);
        clickedItem.set('checked', !checked);
        markerItem.set('checked', !checked);
        textItem.set('checked', !checked);
        legendItem.set('checked', !checked);
      }
      this.emit('itemclick', itemClick);
      this.get('canvas').draw();
    }
    return;
  }

  private _getLegendItem(target) {
    const item = target.get('parent');
    if (item && (item.name === 'legendGroup')) {
      return item;
    }
    return null;
  }

  private _findItem(refer) {
    const items = this.get('items');
    let rst = null;
    const value = (refer instanceof Group) ? refer.get('value') : refer;
    each(items, (item: LegendItem) => {
      if (item.value === value) {
        rst = item;
        return false;
      }
    });
    return rst;
  }

  private _findShapeByName(group: GroupType, name: string) {
    return group.findBy((node: any) => {
      return node.name === name;
    });
  }

  private _getMaxItemSize() {
    let maxItemWidth = -Infinity;
    let maxItemHeight = -Infinity;
    const itemGroup = this.get('itemsGroup');
    const items = itemGroup.get('children');
    each(items, (item) => {
      const i = item as Group;
      const bbox = i.getBBox();
      if (maxItemWidth < bbox.width) maxItemWidth = bbox.width;
      if (maxItemHeight < bbox.height) maxItemHeight = bbox.height;
    });
    return { maxItemWidth, maxItemHeight };
  }
}
