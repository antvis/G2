import { isEqual, get, deepMix } from '@antv/util';
import { TOOLTIP_CSS_CONST } from '@antv/component';
import { Point } from '../../../../interface';
import Action from '../../base';
import { HtmlTooltip } from '../../../../dependents';

/**
 * 用于组件文本省略后需要展示完整信息的 Tooltip Action
 * @ignore
 */
export default class EllipsisText extends Action {
  private timeStamp: number = 0;
  private location: Point;
  private tooltip;

  public destroy() {
    super.destroy();
    this.tooltip && this.tooltip.destroy();
  }

  /**
   * 显示 Tooltip
   * @returns
   */
  public show() {
    const context = this.context;
    const ev = context.event;
    const lastTimeStamp = this.timeStamp;
    const timeStamp = +new Date();

    if (timeStamp - lastTimeStamp > 16) {
      const preLoc = this.location;
      const curLoc = { x: ev.x, y: ev.y };
      if (!preLoc || !isEqual(preLoc, curLoc)) {
        this.showTooltip(curLoc);
      }
      this.timeStamp = timeStamp;
      this.location = curLoc;
    }
  }

  /**
   * 隐藏 Tooltip。
   * @returns
   */
  public hide() {
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
      const tipContent = target.get('tip');
      // 展示 tooltip
      this.tooltip.update({
        title: tipContent,
        ...curLoc,
      });
      this.tooltip.show();
    }
  }

  protected hideTooltip() {
    this.tooltip && this.tooltip.hide();
  }

  private renderTooltip() {
    const view = this.context.view;
    const canvas = view.canvas;

    const region = {
      start: { x: 0, y: 0 },
      end: { x: canvas.get('width'), y: canvas.get('height') },
    };

    const theme = view.getTheme();
    const tooltipStyles = get(theme, ['components', 'tooltip', 'domStyles'], {}); // 获取 tooltip 样式
    const tooltip = new HtmlTooltip({
      parent: canvas.get('el').parentNode,
      region,
      visible: false,
      crosshairs: null,
      domStyles: {
        ...deepMix({}, tooltipStyles, {
          // 超长的时候，tooltip tip 最大宽度为 50%，然后可以换行
          [TOOLTIP_CSS_CONST.CONTAINER_CLASS]: { 'max-width': '50%' },
          [TOOLTIP_CSS_CONST.TITLE_CLASS]: { 'word-break': 'break-all' },
        }),
      },
    });
    tooltip.init();
    tooltip.setCapture(false); // 不允许捕获事件
    this.tooltip = tooltip;
  }
}
