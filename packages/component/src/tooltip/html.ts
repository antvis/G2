import * as domUtil from '@antv/dom-util';
import * as Util from '@antv/util';
import Tooltip from './base';
import Crosshair from './crosshair';
import { TooltipCfg, ToolTipContentItem } from './interface';
import TooltipTheme from './theme';
import { constraintPositionInBoundary, constraintPositionInPanel, defaultPosition } from './util/position';

const CONTAINER_CLASS = 'g2-tooltip';
const TITLE_CLASS = 'g2-tooltip-title';
const LIST_CLASS = 'g2-tooltip-list';
const MARKER_CLASS = 'g2-tooltip-marker';
const VALUE_CLASS = 'g2-tooltip-value';
const LIST_ITEM_CLASS = 'g2-tooltip-list-item';

const find = (dom: any, cls: string): any => {
  return dom.getElementsByClassName(cls)[0];
};

const mergeStyles = (styles: any, cfg: any): any => {
  // todo
  Object.keys(styles).forEach((k) => {
    if (cfg[k]) {
      styles[k] = Util.mix(styles[k], cfg[k]);
    }
  });
  return styles;
};

export default class HtmlTooltip extends Tooltip<TooltipCfg> {
  constructor(cfg: TooltipCfg) {
    super({
      /**
       * tooltip 容器模板
       * @type {String}
       */
      containerTpl: `<div class="${CONTAINER_CLASS}">
        <div class="${TITLE_CLASS}"></div>
        <ul class="${LIST_CLASS}"></ul>
        </div>`,
      /**
       * tooltip 列表项模板
       * @type {String}
       */
      itemTpl: `<li data-index={index}>
        <span style="background-color:{color};" class="${MARKER_CLASS}"></span>
        {name}<span class="${VALUE_CLASS}">{value}</span></li>`,
      /**
       * tooltip html内容
       * @type {String}
       */
      htmlContent: null,
      /**
       * tooltip 内容跟随鼠标移动
       * @type {Boolean}
       */
      follow: true,
      /**
       * 是否允许鼠标停留在 tooltip 上，默认不允许
       * @type {Boolean}
       */
      enterable: false,
      ...cfg,
    });
    const style = TooltipTheme;
    this.style = mergeStyles(style, cfg);
    this._init_();
    if (this.get('items')) {
      this.render();
    }
    // crosshair
    const crosshair = this.get('crosshairs');
    if (crosshair) {
      const plot = crosshair.type === 'rect'? this.get('backgroundGroup') : this.get('frontgroundGroup');
      const crosshairGroup = new Crosshair(
        Util.mix(
          {
            plot,
            panelRange: this.get('panelRange'),
            canvas: this.get('canvas'),
          },
          this.get('crosshairs')
        )
      );
      crosshairGroup.hide();
      this.set('crosshairGroup', crosshairGroup);
    }
  }

  public _init_() {
    const containerTpl = this.get('containerTpl');
    const outterNode = this.get('canvas').get('el').parentNode;
    let container;
    if (!this.get('htmlContent')) {
      if (/^\#/.test(containerTpl)) {
        // 如果传入 dom 节点的 id
        const id = containerTpl.replace('#', '');
        container = document.getElementById(id);
      } else {
        container = domUtil.createDom(containerTpl);
      }
    } else {
      container = this._getHtmlContent();
    }
    this.set('container', container);
    domUtil.modifyCSS(container, this.style[CONTAINER_CLASS]);
    outterNode.appendChild(container);
    outterNode.style.position = 'relative';
  }

  public render() {
    this.clear();
    if (this.get('htmlContent')) {
      const outterNode = this.get('canvas').get('el').parentNode;
      const container = this._getHtmlContent();
      outterNode.appendChild(container);
      domUtil.modifyCSS(container, this.style[CONTAINER_CLASS]);
      this.set('container', container);
    } else {
      this._renderTpl();
    }
  }

  public _renderTpl() {
    const showTitle = this.get('showTitle');
    const titleContent = this.get('titleContent');
    const container = this.get('container');
    const titleDom = find(container, TITLE_CLASS);
    const listDom = find(container, LIST_CLASS);
    const items = this.get('items');
    if (titleDom && showTitle) {
      domUtil.modifyCSS(titleDom, this.style[TITLE_CLASS]);
      titleDom.innerHTML = titleContent;
    }

    if (listDom) {
      domUtil.modifyCSS(listDom, this.style[LIST_CLASS]);
      Util.each(items, (item: ToolTipContentItem, index: number) => {
        listDom.appendChild(this._addItem(item, index));
      });
    }
  }

  public clear() {
    const container = this.get('container');
    if (container && this.get('htmlContent')) {
      container.remove();
    } else {
      const titleDom = find(container, TITLE_CLASS);
      const listDom = find(container, LIST_CLASS);
      if (titleDom) {
        titleDom.innerHTML = '';
      }
      if (listDom) {
        listDom.innerHTML = '';
      }
    }
  }

  public show() {
    const container = this.get('container');
    container.style.visibility = 'visible';
    container.style.display = 'block';
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      crosshairGroup.show();
    }
    const markerGroup = this.get('markerGroup');
    if (markerGroup) {
      markerGroup.show();
    }
    super.show();
    this.get('canvas').draw();
  }

  public hide() {
    const container = this.get('container');
    container.style.visibility = 'hidden';
    container.style.display = 'none';
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      crosshairGroup.hide();
    }
    const markerGroup = this.get('markerGroup');
    if (markerGroup) {
      markerGroup.hide();
    }
    super.hide();
    this.get('canvas').draw();
  }

  public destroy() {
    const container = this.get('container');
    const containerTpl = this.get('containerTpl');
    if (container && !/^\#/.test(containerTpl)) {
      container.parentNode.removeChild(container);
    }
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      crosshairGroup.destroy();
    }
    const markerGroup = this.get('markerGroup');
    if (markerGroup) {
      markerGroup.remove();
    }
    super.destroy();
  }

  public _addItem(item: ToolTipContentItem, index: number) {
    const itemTpl = this.get('itemTpl'); // TODO: 有可能是个回调函数
    const itemDiv = Util.substitute(
      itemTpl,
      Util.mix(
        // @ts-ignore
        {
          // @ts-ignore
          index,
        },
        item
      )
    );
    const itemDOM = domUtil.createDom(itemDiv);
    domUtil.modifyCSS(itemDOM, this.style[LIST_ITEM_CLASS]);
    const markerDom = find(itemDOM, MARKER_CLASS);
    if (markerDom) {
      domUtil.modifyCSS(markerDom, this.style[MARKER_CLASS]);
    }
    const valueDom = find(itemDOM, VALUE_CLASS);
    if (valueDom) {
      domUtil.modifyCSS(valueDom, this.style[VALUE_CLASS]);
    }
    return itemDOM;
  }

  public _getHtmlContent() {
    const htmlContent = this.get('htmlContent');
    const title = this.get('titleContent');
    const items = this.get('items');

    const html = htmlContent(title, items);
    let ele;
    if (Util.isElement(html)) {
      ele = html;
    } else {
      ele = domUtil.createDom(html);
    }
    return ele;
  }

  public setPosition(oldx: number, oldy: number, target?: any) {
    // todo any 是 Shape
    let x = oldx;
    let y = oldy;
    const container = this.get('container');
    const outterNode = this.get('canvas').get('el');
    const viewWidth = domUtil.getWidth(outterNode);
    const viewHeight = domUtil.getHeight(outterNode);
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    let endx = x;
    let endy = y;

    let position;
    const prePosition = this.get('prePosition') || { x: 0, y: 0 };

    // @2019-01-30 by blue.lb 由于display:none的元素获取clientWidth和clientHeight的值为0，这里强制显隐一下，其实直接在show和hide中去掉display设置最好，猜测为了更好的兼容浏览器
    if (!containerWidth) {
      container.style.display = 'block';
      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;
      container.style.display = 'none';
    }

    if (this.get('enterable')) {
      y = y - container.clientHeight / 2;
      position = [x, y];
      if (prePosition && x - prePosition.x > 0) {
        // 留 1px 防止鼠标点击事件无法在画布上触发
        x -= container.clientWidth + 1;
      } else {
        x += 1;
      }
    } else if (this.get('position')) {
      position = defaultPosition(x, y, this.get('position'), containerWidth, containerHeight, target);
      x = position[0];
      y = position[1];
    } else {
      position = constraintPositionInBoundary(x, y, containerWidth, containerHeight, viewWidth, viewHeight);
      x = position[0];
      y = position[1];
    }

    if (this.get('inPanel')) {
      // tooltip 必须限制在绘图区域内
      const panelRange = this.get('panelRange');
      const panelGroup = this.get('panelGroup');
      const panelClip = panelGroup.attr('clip');
      position = constraintPositionInPanel(
        x,
        y,
        containerWidth,
        containerHeight,
        panelClip ? panelClip.getBBox() : panelRange,
        this.get('enterable')
      );
      x = position[0];
      y = position[1];
    }
    const markerItems = this.get('markerItems');
    if (!Util.isEmpty(markerItems)) {
      endx = markerItems[0].x;
      endy = markerItems[0].y;
    }

    this.set('prePosition', position); // 记录上次的位置
    const follow = this.get('follow');

    if (follow) {
      container.style.left = `${x}px`;
      container.style.top = `${y}px`;
    }
    const crosshairGroup = this.get('crosshairGroup');
    if (crosshairGroup) {
      const items = this.get('items');
      crosshairGroup.setPosition(endx, endy, items);
    }
    super.setPosition(x, y);
  }
}
