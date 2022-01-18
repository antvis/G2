import ListState from './list-state';
import { isEqual } from '@antv/util';
import { TOOLTIP_CSS_CONST } from '@antv/component';
import { HtmlTooltip } from '../../../dependents';
import { Point } from '../../../interface';

const STATUS_SHOW = 'showRadio';
const TIP_ID = 'legend-radio-tip';

class ListRadio extends ListState {
  public show() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item } = triggerInfo;
      list.setItemState(item, STATUS_SHOW, true);
    }
  }

  public hide() {
    const triggerInfo = this.getTriggerListInfo();
    if (triggerInfo?.item) {
      const { list, item } = triggerInfo;
      list.setItemState(item, STATUS_SHOW, false);
    }
  }

  private timeStamp: number = 0;
  private location: Point;
  private tooltip;

  public destroy() {
    super.destroy();
    this.tooltip && this.tooltip.destroy();
  }

  /**
   * 显示 Tooltip (展示在上方)
   * @returns
   */
  public showTip() {
    const context = this.context;
    const ev = context.event;
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();

    const target = this.context.event.target;
    if (timeStamp - lastTimeStamp > 16 && target.get('name') === 'legend-item-radio') {
      const preLoc = this.location;
      const curLoc = { x: ev.x, y: ev.y };
      this.timeStamp = timeStamp;
      this.location = curLoc;      
      if (!preLoc || !isEqual(preLoc, curLoc)) {
        this.showTooltip(curLoc);
      }
    }
  }

  /**
   * 隐藏 Tooltip。
   * @returns
   */
  public hideTip() {
    this.hideTooltip();
    this.location = null;
  }

  protected showTooltip(curLoc: Point) {
    const context = this.context;
    const ev = context.event;
    const target = ev.target;

    if (target && target.get('tip')) {
      if (!this.tooltip) {
        this.renderTooltip(); // 延迟生成
      }
      // 展示 tooltip
      const { x: offsetX, y: offsetY } = context.view.getCanvas().get('el').getBoundingClientRect();
      this.tooltip.update({
        title: target.get('tip'),
        ...curLoc,
        x: curLoc.x + offsetX,
        y: curLoc.y + offsetY,
      });
      this.tooltip.show();
    }
  }

  protected hideTooltip() {
    this.tooltip && this.tooltip.hide();
  }

  private renderTooltip() {
    const tooltipStyles = {
      [TOOLTIP_CSS_CONST.CONTAINER_CLASS]: {
        padding: '6px 8px',
        transform: 'translate(-50%, -80%)',
        background: 'rgba(0,0,0,0.75)',
        color: '#fff',
        'border-radius': '2px',
        // 避免遮挡，如果还不够的话，再考虑开放用户配置
        'z-index': 100,
      },
      [TOOLTIP_CSS_CONST.TITLE_CLASS]: {
        'font-size': '12px',
        'line-height': '14px',
        'margin-bottom': 0,
        'word-break': 'break-all',
      }
    };
    if (document.getElementById(TIP_ID)) {
      document.body.removeChild(document.getElementById(TIP_ID));
    }
    const tooltip = new HtmlTooltip({
      parent: document.body,
      // tooltip 限制的区域
      region: null,
      visible: false,
      crosshairs: null,
      domStyles: tooltipStyles,
      containerId: TIP_ID,
    });
    tooltip.init();
    tooltip.setCapture(false); // 不允许捕获事件
    this.tooltip = tooltip;
  }
}

export default ListRadio;
