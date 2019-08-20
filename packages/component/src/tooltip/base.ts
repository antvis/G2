import * as Util from '@antv/util';
import { TooltipCfg, ToolTipContentItem } from './interface';
import Guide from '../base';

export default class Tooltip extends Guide {
  protected style?: any; // todo

  constructor(cfg: TooltipCfg) {
    super({
      /**
       * 右下角坐标
       */
      x: 0,
      /**
       * y 右下角坐标
       */
      y: 0,
      /**
       * tooltip 记录项
       */
      items: null,
      /**
       * tooltip 标题
       * @type {Array}
       */
      titleContent: null,
      /**
       * 是否展示 title
       * @type {Boolean}
       */
      showTitle: true,
      /**
       * 视图范围
       * @type {Object}
       */
      panelRange: null,
      /**
       * 将 tooltip 展示在指定区域内
       * @type {Boolean}
       */
      inPanel: true,
      /**
       * tooltip 辅助线配置
       * @type {Object}
       */
      crosshairs: null,
      ...cfg,
    });
  }

  isContentChange(title: string, items: ToolTipContentItem[]) {
    const titleContent = this.get('titleContent');
    const lastItems = this.get('items');
    let isChanged = !(title === titleContent && lastItems.length === items.length);
    if (!isChanged) {
      Util.each(items, (item: ToolTipContentItem, index: number) => {
        const preItem = lastItems[index];
        const keys = Object.keys(item);
        isChanged = keys.some((key: string) => !Util.isObject(item[key]) && item[key] !== preItem[key]);
        if (isChanged) {
          return false;
        }
      });
    }

    return isChanged;
  }

  setContent(title: string, items: ToolTipContentItem[]) {
    this.set('items', items);
    this.set('titleContent', title);
    this.render();
    return this;
  }

  setPosition(x: number, y: number, target?: Element) {
    this.set('x', x);
    this.set('y', y);
  }

  setMarkers(markerItems: ToolTipContentItem[], markerCfg: any) { // todo
    let markerGroup = this.get('markerGroup');
    const frontgroundGroup = this.get('frontgroundGroup');
    if (!markerGroup) {
      markerGroup = frontgroundGroup.addGroup({
        zIndex: 1,
        capture: false, // 不进行拾取
      });
      this.set('markerGroup', markerGroup);
    } else {
      markerGroup.clear();
    }
    Util.each(markerItems, (item: ToolTipContentItem): void => {
      markerGroup.addShape('marker', {
        color: item.color,
        attrs: Util.mix(
          {
            fill: item.color,
            symbol: 'circle',
            shadowColor: item.color,
          },
          markerCfg,
          {
            x: item.x,
            y: item.y,
          },
        ),
      });
    });
    this.set('markerItems', markerItems);
  }

  clearMarkers() {
    const markerGroup = this.get('markerGroup');
    markerGroup && markerGroup.clear();
  }

  render() {
  }

  clear() {
  }

  show() {
    this.set('visible', true);
  }

  hide() {
    this.set('visible', false);
  }
}
