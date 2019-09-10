/**
 * @description 使用 HTML 进行渲染的图例
 */

import * as domUtil from '@antv/dom-util';
import { BBox } from '@antv/g';
import * as Util from '@antv/util';
import { CommonCfg, HTMLCategoryLegendCfg } from '../../interface';
import CategoryBase from './base';

const DEFAULT_THEME = {
  backgroundStyle: {
    position: 'absolute',
    overflow: 'auto',
    top: 0,
    left: 0,
  },
  titleStyle: {
    marginBottom: '4px',
  },
  listStyle: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  itemStyle: {
    cursor: 'pointer',
    marginBottom: '5px',
    marginRight: '16px',
    userSelect: 'none',
  },
  markerStyle: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
    verticalAlign: 'middle',
  },
  pagination: {
    activeColor: '#000', // 可点击的颜色
    inactiveColor: '#ccc', // 不可点击的颜色
    arrowSize: 8, // 箭头的大小
    animation: true, // 是否开启滑动动画
  },
};

function _findParentNode(node, className) {
  let nodeClass = node.className;
  if (Util.isNil(nodeClass)) {
    return node;
  }
  nodeClass = nodeClass.split(' ');
  if (nodeClass.indexOf(className) > -1) {
    return node;
  }

  if (node.parentNode) {
    if (node.parentNode.className === className) {
      return node.parentNode;
    }
    return _findParentNode(node.parentNode, className);
  }

  return null;
}

function _findNodeByClass(node, className) {
  return node.getElementsByClassName(className)[0];
}

export default class HTMLLegend extends CategoryBase {
  constructor(cfg: HTMLCategoryLegendCfg) {
    super({
      type: 'html-legend',
      prefixClassName: 'g2-legend',
      pagination: true, // 是否允许分页，默认为 true
      highlight: false, // 默认不开启高亮效果
      ...cfg,
    });
  }

  public init() {
    // 初始化 HTML dom
    const fontFamily = this.get('fontFamily');
    // const width = this.get('width');
    // const height = this.get('height');
    const layout = this.get('layout');
    const maxWidth = this.get('maxWidth');
    const maxHeight = this.get('maxHeight');
    const prefixClassName = this.get('prefixClassName');
    let containerTpl = this.get('containerTpl');
    if (!containerTpl) {
      containerTpl = `<div class="${prefixClassName}">
        <div class="${prefixClassName}-title"></div>
        <ul class="${prefixClassName}-list"></ul>
      </div>`;
    }
    const legendContainer = domUtil.createDom(containerTpl);
    const backgroundStyle = Util.deepMix({}, DEFAULT_THEME.backgroundStyle, this.get('backgroundStyle'));
    domUtil.modifyCSS(legendContainer, {
      fontFamily,
      maxHeight: `${maxHeight}px`,
      // width: 'auto',
      width: '100%',
      height: 'auto',
      ...backgroundStyle,
    });
    if (layout === 'horizontal') {
      domUtil.modifyCSS(legendContainer, {
        maxWidth: `${maxWidth}px`,
      });
    }

    let container = this.get('container');
    if (!container) {
      // 没有传入挂载的 dom，则作为 canvas 的兄弟节点
      const canvas = this.get('canvas');
      const mountNode = canvas.get('el').parentNode;
      mountNode.appendChild(legendContainer);
    } else if (/^\#/.test(container)) {
      // 如果传入 dom 节点的 id
      const id = container.replace('#', '');
      container = document.getElementById(id);
      container.appendChild(legendContainer);
    } else {
      // 传入 dom 节点
      container.appendChild(legendContainer);
    }

    this.set('_legendContainer', legendContainer);
  }

  // 渲染标题
  public renderTitle() {
    const title = this.get('title');
    if (title) {
      const prefixClassName = this.get('prefixClassName');
      const legendContainer = this.get('_legendContainer');
      let titleContainer = _findNodeByClass(legendContainer, `${prefixClassName}-title`);
      if (!titleContainer) {
        titleContainer = domUtil.createDom(`<div class="${prefixClassName}-title"></div>`);
        legendContainer.appendChild(titleContainer);
      }
      titleContainer.innerHTML = title;
      const titleStyle = Util.deepMix({}, DEFAULT_THEME.titleStyle, this.get('titleStyle'));
      domUtil.modifyCSS(titleContainer, titleStyle);
      this.set('_titleContainer', titleContainer);
    }
  }

  // 渲染图例项
  public renderItems() {
    const items = this.get('items');
    if (!items || !items.length) {
      return;
    }

    const legendContainer = this.get('_legendContainer');
    const layout = this.get('layout');
    const prefixClassName = this.get('prefixClassName');
    const reversed = this.get('reversed');

    if (reversed) {
      items.reverse();
    }

    let itemGroupContainer = _findNodeByClass(legendContainer, `${prefixClassName}-list`);
    if (!itemGroupContainer) {
      itemGroupContainer = domUtil.createDom(`<ul class="${prefixClassName}-list"></ul>`);
    }
    const listStyle = Util.deepMix({}, DEFAULT_THEME.listStyle, this.get('listStyle'));
    if (layout === 'horizontal') {
      // 使 itemGroupContainer 内容不换行，计算分页时才能比较 scrollWidth 和 offsetWidth 的大小。
      // @todo ie是否会有兼容问题？
      listStyle.width = 'max-content';
    }
    domUtil.modifyCSS(itemGroupContainer, listStyle);

    // 用于支持分页逻辑
    const clipContainer = domUtil.createDom('<div></div>');
    legendContainer.appendChild(clipContainer);
    clipContainer.appendChild(itemGroupContainer);

    this.set('_clipContainer', clipContainer);
    this.set('_itemGroupContainer', itemGroupContainer);

    let itemTpl = this.get('itemTpl');
    if (!itemTpl) {
      itemTpl = `<li class="${prefixClassName}-item">
      <span class="${prefixClassName}-item-marker"></span>
      <span class="${prefixClassName}-item-text"></span>
      </li>`;
    }

    const unSelectedColor = this.get('unSelectedColor');
    const itemStyle = Util.deepMix({}, DEFAULT_THEME.itemStyle, this.get('itemStyle')); // TODO: 重命名
    const markerStyle = Util.deepMix({}, DEFAULT_THEME.markerStyle, this.get('markerStyle'));

    if (layout === 'horizontal') {
      itemStyle.display = 'inline-block';
    } else if (layout === 'vertical') {
      itemStyle.display = 'block';
    }

    const itemMap = {};
    Util.each(items, (item: CommonCfg, index: number) => {
      const checked = item.checked;
      const value = this.formatterValue(item.value); // 按照 formatter 配置格式化文本
      const originColor = item.marker.fill || item.marker.stroke;
      const color = checked ? originColor : unSelectedColor;
      let itemDom;
      if (Util.isFunction(itemTpl)) {
        // 用户声明了回调
        const domStr = itemTpl(value, color, checked, index);
        itemDom = domUtil.createDom(domStr);
      } else {
        itemDom = domUtil.createDom(itemTpl);
        const textDom = _findNodeByClass(itemDom, `${prefixClassName}-item-text`);
        textDom.innerHTML = value;
      }
      itemStyle.color = color; // 设置为当前状态对应的文本颜色
      markerStyle.backgroundColor = color; // 设置为当前状态 marker 的背景色

      domUtil.modifyCSS(itemDom, itemStyle);
      itemDom.setAttribute('data-checked', checked); // 存储当前的选中状态
      itemDom.setAttribute('data-value', item.value); // 存储 item 的原始值
      itemDom.setAttribute('data-color', originColor); // 存储 item 的原始颜色

      const markerDom = _findNodeByClass(itemDom, `${prefixClassName}-item-marker`);
      if (markerDom) {
        domUtil.modifyCSS(markerDom, markerStyle);
      }
      itemGroupContainer.appendChild(itemDom);

      itemMap[item.value] = item; // 用于快速查找 dom 对应的 item 数据
    });
    this.set('_itemMap', itemMap);
    if (layout === 'horizontal') {
      this._renderHorizontalPagination();
    } else {
      this._renderPagination();
    }
  }

  public bindEvents() {
    const itemGroupContainer = this.get('_itemGroupContainer');
    if (!itemGroupContainer) {
      return;
    }

    if (this.get('clickable')) {
      itemGroupContainer.onclick = (ev) => this._onClick(ev);
    }

    if (this.get('hoverable')) {
      itemGroupContainer.onmousemove = (ev) => this._onMousemove(ev);
      itemGroupContainer.onmouseout = (ev) => this._onMouseout(ev);
    }
  }

  /**
   * 获取图例的宽度
   */
  public getWidth(): number {
    const container = this.get('_legendContainer');
    return domUtil.getOuterWidth(container);
  }

  /**
   * 获取图例的高度
   */
  public getHeight(): number {
    const container = this.get('_legendContainer');
    return domUtil.getOuterHeight(container);
  }

  /**
   * 获取图例的BBox
   */
  public getBBox(): BBox {
    return new BBox(this.get('x') || 0, this.get('y') || 0, this.getWidth(), this.getHeight());
  }

  /**
   * 将图例移动至 (x, y）坐标点位置
   * @param x x 坐标
   * @param y y 坐标
   */
  public moveTo(x: number, y: number) {
    const container = this.get('_legendContainer');
    domUtil.modifyCSS(container, {
      left: `${x}px`,
      top: `${y}px`,
    });
    this.set('x', x);
    this.set('y', y);
  }

  /**
   * 销毁
   */
  public destroy() {
    super.destroy();
    const container = this.get('_legendContainer');
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  public draw() {
    // HTML Legend 不需要调用 canvas.draw();
    return null;
  }

  private _updateStatus(itemDom: HTMLElement, markerDom: HTMLElement, color: string, checked: string) {
    if (markerDom) {
      markerDom.style.background = color;
    }

    itemDom.style.color = color;
    itemDom.setAttribute('data-checked', checked);
  }

  private _onClick(ev) {
    const items = this.get('items');
    const itemGroupContainer = this.get('_itemGroupContainer');

    const prefixClassName = this.get('prefixClassName');
    const LIST_ITEM_CLASS = `${prefixClassName}-item`;
    const LIST_ITEM_MARKER_CLASS = `${prefixClassName}-item-marker`;

    const target = ev.target;
    const targetClassName = target.className.split(' ');
    if (Util.indexOf(targetClassName, `${prefixClassName}-list`) > -1) {
      // 用户点击到了 list 容器上
      return;
    }

    const clickedItemDom = _findParentNode(target, LIST_ITEM_CLASS);
    const markerDom = _findNodeByClass(clickedItemDom, LIST_ITEM_MARKER_CLASS);

    const itemMap = this.get('_itemMap');
    const clickedItem = itemMap[clickedItemDom.getAttribute('data-value')];
    // if (!clickedItem) {
    //   return;
    // }

    const originColor = clickedItemDom.getAttribute('data-color');
    const selectedMode = this.get('selectedMode');
    const unSelectedColor = this.get('unSelectedColor');
    const itemNodes = itemGroupContainer.childNodes;
    if (selectedMode === 'single') {
      // 单选模式
      clickedItem.checked = true; // 更新选中状态
      // 其他图例项全部置灰
      Util.each(itemNodes, (child: HTMLElement) => {
        if (child !== clickedItemDom) {
          // tslint:disable-next-line: no-shadowed-variable
          const markerDom = _findNodeByClass(child, LIST_ITEM_MARKER_CLASS);
          this._updateStatus(child, markerDom, unSelectedColor, 'false');

          const childItem = itemMap[child.getAttribute('data-value')];
          childItem.checked = false;
        } else {
          this._updateStatus(clickedItemDom, markerDom, originColor, 'true');
        }
      });
    } else {
      // 混合模式
      const isCurrentChecked = clickedItemDom.getAttribute('data-checked') === 'true';
      let count = 0;
      Util.each(itemNodes, (child: HTMLElement) => {
        if (child.getAttribute('data-checked') === 'true') {
          count++;
        }
      });
      if (!this.get('allowAllCanceled') && isCurrentChecked && count === 1) {
        return;
      }
      // 在判断最后一个图例后再更新checked状态，防止点击最后一个图例item时图例样式没有变化但是checked状态改变了 fix #422
      clickedItem.checked = !clickedItem.checked;
      if (isCurrentChecked) {
        this._updateStatus(clickedItemDom, markerDom, unSelectedColor, 'false');
      } else {
        this._updateStatus(clickedItemDom, markerDom, originColor, 'true');
      }
    }

    this.emit('itemclick', {
      item: clickedItem,
      currentTarget: clickedItemDom,
      checked: selectedMode === 'single' ? true : clickedItem.checked,
    });
  }

  private _onMousemove(ev) {
    const lastActiveItem = this.get('_lastActiveItem');
    const items = this.get('items');
    const itemMap = this.get('_itemMap');
    const prefixClassName = this.get('prefixClassName');

    const LIST_CLASS = `${prefixClassName}-list`;
    const LIST_ITEM_CLASS = `${prefixClassName}-item`;

    const target = ev.target;
    const targetClassName = target.className.split(' ');
    if (Util.indexOf(targetClassName, LIST_CLASS) > -1) {
      // 用户 move 到了 list 容器上
      return;
    }

    const hoveredItemDom = _findParentNode(target, LIST_ITEM_CLASS);
    const hoveredItem = itemMap[hoveredItemDom.getAttribute('data-value')];

    if (hoveredItem) {
      const highlight = this.get('highlight');
      if (hoveredItem.checked && lastActiveItem !== hoveredItem) {
        // 只有选中状态才应用样式
        hoveredItemDom.className += ' active';
        if (highlight) {
          // 如果开启高亮效果
          const itemGroupContainer = this.get('_itemGroupContainer');
          const itemNodes = itemGroupContainer.childNodes;
          itemNodes.forEach((itemNode) => {
            if (itemNode !== hoveredItemDom && itemNode.getAttribute('data-checked') === 'true') {
              itemNode.className += ' inactive';
            }
          });
        }
        this.set('_lastActiveItem', hoveredItem);
      }
      this.emit('itemmouseover', {
        item: hoveredItem,
        currentTarget: hoveredItemDom,
        checked: hoveredItem.checked,
      });
    }
  }

  private _onMouseout(ev) {
    const itemGroupContainer = this.get('_itemGroupContainer');
    const itemNodes = itemGroupContainer.childNodes;
    itemNodes.forEach((node) => {
      const className = node.className.split(' ');
      Util.remove(className, (a) => a === 'active' || a === 'inactive');
      node.className = className.join(' ');
    });
    this.set('_lastActiveItem', null);
    this.emit('itemmouseleave', ev);
  }

  private _renderPagination() {
    const pagination = this.get('pagination');
    const legendContainer = this.get('_legendContainer');
    const itemGroupContainer = this.get('_itemGroupContainer');
    const paginationDomStr = `
      <div style="position: absolute;bottom: 0;left: 0;user-select: none;margin-top: 5px;">
        <div class="pre-page"
          style="display:inline-block;-webkit-transform: rotate(-135deg);transform: rotate(-135deg);margin-left: 2px;">
        </div>
        <span class="current-page-number">1</span> /  <span class="total-page-number">0</span>
        <div class="next-page"
          style="display:inline-block;-webkit-transform: rotate(45deg);transform: rotate(45deg);margin-right: 2px;">
        </div>
      </div>
    `; // 分页器结构模板，目前不允许自定义

    if (pagination && legendContainer.scrollHeight > legendContainer.offsetHeight) {
      // 满足分页条件
      domUtil.modifyCSS(legendContainer, {
        overflow: 'hidden',
        height: `${this.get('maxHeight')}px`,
      }); // 如果允许分页，则禁止滚动
      const paginationDom = domUtil.createDom(paginationDomStr);
      legendContainer.appendChild(paginationDom);

      const legendContainerHeight = this.getHeight(); // legend 容器的高度
      const titleHeight = this.get('_titleContainer') ? domUtil.getOuterHeight(this.get('_titleContainer')) : 0; // Legend 标题的高度
      const paginationHeight = domUtil.getOuterHeight(paginationDom); // 分页器的高度
      const itemGroupContainerHeight = legendContainerHeight - titleHeight - paginationHeight; // 获取图例项容器的可视高度
      const itemGroupContainerOffsetHeight = itemGroupContainer.offsetHeight; // 获取图例项实际的高度

      // 剪切区域的样式设置
      const clipContainer = this.get('_clipContainer');
      domUtil.modifyCSS(clipContainer, {
        maxHeight: `${itemGroupContainerHeight}px`,
        overflow: 'hidden',
      });

      const pageSize = Math.ceil(itemGroupContainerOffsetHeight / itemGroupContainerHeight); // 计算页数
      const itemHeight = domUtil.getOuterHeight(itemGroupContainer.childNodes[0]); // 获取每个图例项的高度
      const onePageCount = Math.floor(itemGroupContainerHeight / itemHeight); // 计算一页可完整显示的图例项个数
      const deltaHeight = onePageCount * itemHeight; // 每页滚动的高度

      const currentPageNum = _findNodeByClass(paginationDom, 'current-page-number');
      const totalPageNum = _findNodeByClass(paginationDom, 'total-page-number');
      const prePageButton = _findNodeByClass(paginationDom, 'pre-page');
      const nextPageButton = _findNodeByClass(paginationDom, 'next-page');

      totalPageNum.innerHTML = pageSize;

      const paginationCfg = Util.deepMix({}, DEFAULT_THEME.pagination, pagination);
      const activeStyle = {
        cursor: 'pointer',
        border: `${paginationCfg.activeColor} solid`,
        borderWidth: '2px 2px 0 0',
        width: `${paginationCfg.arrowSize}px`,
        height: `${paginationCfg.arrowSize}px`,
      };
      const inactiveStyle = {
        cursor: 'default',
        border: `${paginationCfg.inactiveColor} solid`,
        borderWidth: '2px 2px 0 0',
        width: `${paginationCfg.arrowSize}px`,
        height: `${paginationCfg.arrowSize}px`,
      };

      domUtil.modifyCSS(prePageButton, inactiveStyle);
      domUtil.modifyCSS(nextPageButton, activeStyle);
      if (paginationCfg.animation) {
        // 允许分页的滚动动画
        domUtil.modifyCSS(itemGroupContainer, {
          transition: 'transform .3s ease-in',
        });
      }

      let currentPage = 1;
      let translateY = 0;
      prePageButton.onclick = () => {
        if (currentPage === 1) {
          return;
        }
        currentPage -= 1;
        translateY += deltaHeight;
        currentPageNum.innerHTML = currentPage;

        domUtil.modifyCSS(prePageButton, activeStyle);
        domUtil.modifyCSS(nextPageButton, activeStyle);
        domUtil.modifyCSS(itemGroupContainer, {
          transform: `translateY(${translateY}px)`,
        });
        if (currentPage === 1) {
          domUtil.modifyCSS(prePageButton, inactiveStyle);
        }
      };

      nextPageButton.onclick = () => {
        if (currentPage === pageSize) {
          return;
        }
        currentPage += 1;
        translateY -= deltaHeight;
        currentPageNum.innerHTML = currentPage;

        domUtil.modifyCSS(nextPageButton, activeStyle);
        domUtil.modifyCSS(prePageButton, activeStyle);
        domUtil.modifyCSS(itemGroupContainer, {
          transform: `translateY(${translateY}px)`,
        });
        if (currentPage === pageSize) {
          domUtil.modifyCSS(nextPageButton, inactiveStyle);
        }
      };
    }
  }
  private _renderHorizontalPagination() {
    const pagination = this.get('pagination');
    const legendContainer = this.get('_legendContainer');
    const itemGroupContainer = this.get('_itemGroupContainer');
    const paginationDomStr = `
      <div style="position: absolute;bottom: 4px;right: 12px;user-select: none;margin-top: 5px;background: #fff;">
        <div class="pre-page"
          style="display:inline-block;-webkit-transform: rotate(-135deg);transform: rotate(-135deg);margin-left: 2px;">
        </div>
        <span class="current-page-number">1</span> /  <span class="total-page-number">0</span>
        <div class="next-page"
          style="display:inline-block;-webkit-transform: rotate(45deg);transform: rotate(45deg);margin-right: 2px;">
        </div>
      </div>
    `; // 分页器结构模板，目前不允许自定义
    if (pagination && legendContainer.scrollWidth > legendContainer.offsetWidth) {
      // 满足分页条件
      domUtil.modifyCSS(legendContainer, {
        overflow: 'hidden',
        width: `${this.get('maxWidth')}px`,
      }); // 如果允许分页，则禁止滚动
      const paginationDom = domUtil.createDom(paginationDomStr);
      legendContainer.appendChild(paginationDom);

      const legendContainerWidth = this.getWidth(); // legend 容器的宽度
      // const titleHeight = this.get('_titleContainer') ?
      // Util.getOuterHeight(this.get('_titleContainer')) : 0;  // Legend 标题的高度
      const paginationWidth = domUtil.getOuterWidth(paginationDom); // 分页器的宽度
      const itemGroupContainerWidth = legendContainerWidth - paginationWidth - 40; // 获取图例项容器的可视宽度
      const itemGroupContainerOffsetWidth = itemGroupContainer.offsetWidth; // 获取图例项实际的宽度

      // 剪切区域的样式设置
      const clipContainer = this.get('_clipContainer');
      domUtil.modifyCSS(clipContainer, {
        maxWidth: `${itemGroupContainerWidth}px`,
        overflow: 'hidden',
      });

      const pageSize = Math.ceil(itemGroupContainerOffsetWidth / itemGroupContainerWidth); // 计算页数
      const itemWidth = domUtil.getOuterWidth(itemGroupContainer.childNodes[0]); // 获取每个图例项的宽度
      // const onePageCount = Math.floor(itemGroupContainerWidth / itemWidth); // 计算一页可完整显示的图例项个数
      const deltaWidth = itemGroupContainerWidth; // 每页滚动的宽度

      const currentPageNum = _findNodeByClass(paginationDom, 'current-page-number');
      const totalPageNum = _findNodeByClass(paginationDom, 'total-page-number');
      const prePageButton = _findNodeByClass(paginationDom, 'pre-page');
      const nextPageButton = _findNodeByClass(paginationDom, 'next-page');

      totalPageNum.innerHTML = pageSize;

      const paginationCfg = Util.deepMix({}, DEFAULT_THEME.pagination, pagination);
      const activeStyle = {
        cursor: 'pointer',
        border: `${paginationCfg.activeColor} solid`,
        borderWidth: '2px 2px 0 0',
        width: `${paginationCfg.arrowSize}px`,
        height: `${paginationCfg.arrowSize}px`,
      };
      const inactiveStyle = {
        cursor: 'default',
        border: `${paginationCfg.inactiveColor} solid`,
        borderWidth: '2px 2px 0 0',
        width: `${paginationCfg.arrowSize}px`,
        height: `${paginationCfg.arrowSize}px`,
      };

      domUtil.modifyCSS(prePageButton, inactiveStyle);
      domUtil.modifyCSS(nextPageButton, activeStyle);
      if (paginationCfg.animation) {
        // 允许分页的滚动动画
        domUtil.modifyCSS(itemGroupContainer, {
          transition: 'transform .3s ease-in',
        });
      }

      let currentPage = 1;
      let translateX = 0;
      prePageButton.onclick = () => {
        if (currentPage === 1) {
          return;
        }
        currentPage -= 1;
        translateX += deltaWidth;
        currentPageNum.innerHTML = currentPage;

        domUtil.modifyCSS(prePageButton, activeStyle);
        domUtil.modifyCSS(nextPageButton, activeStyle);
        domUtil.modifyCSS(itemGroupContainer, {
          transform: `translateX(${translateX}px)`,
        });
        if (currentPage === 1) {
          domUtil.modifyCSS(prePageButton, inactiveStyle);
        }
      };

      nextPageButton.onclick = () => {
        if (currentPage === pageSize) {
          return;
        }
        currentPage += 1;
        translateX -= deltaWidth;
        currentPageNum.innerHTML = currentPage;

        domUtil.modifyCSS(nextPageButton, activeStyle);
        domUtil.modifyCSS(prePageButton, activeStyle);
        domUtil.modifyCSS(itemGroupContainer, {
          transform: `translateX(${translateX}px)`,
        });
        if (currentPage === pageSize) {
          domUtil.modifyCSS(nextPageButton, inactiveStyle);
        }
      };
    }
  }
}
