/**
 * @fileoverview 设置画布的箭头，参看：https://www.w3school.com.cn/jsref/prop_style_cursor.asp
 * @author dxq613
 */
import Action from './base';

/**
 * 鼠标形状的 Action
 * @ignore
 */
class CursorAction extends Action {
  private setCursor(cursor) {
    const view = this.context.view;
    view.getCanvas().setCursor(cursor);
  }

  /**
   * 默认光标（通常是一个箭头）
   */
  public default() {
    this.setCursor('default');
  }

  /** 光标呈现为指示链接的指针（一只手） */
  public pointer() {
    this.setCursor('pointer');
  }
  /** 此光标指示某对象可被移动。 */
  public move() {
    this.setCursor('move');
  }
  /** 光标呈现为十字线。 */
  public crosshair() {
    this.setCursor('crosshair');
  }
  /** 此光标指示程序正忙（通常是一只表或沙漏）。 */
  public wait() {
    this.setCursor('wait');
  }

  /** 此光标指示可用的帮助（通常是一个问号或一个气球）。 */
  public help() {
    this.setCursor('help');
  }

  /** 此光标指示文本。 */
  public text() {
    this.setCursor('text');
  }

  /**
   * 此光标指示矩形框的边缘可被向右（东）移动。
   */
  public eResize() {
    this.setCursor('e-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向左（西）移动。
   */
  public wResize() {
    this.setCursor('w-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向上（北）移动。
   */
  public nResize() {
    this.setCursor('n-resize');
  }

  /**
   * 此光标指示矩形框的边缘可被向下（南）移动。
   */
  public sResize() {
    this.setCursor('s-resize');
  }
  /**
   * 光标指示可移动的方向 右上方（东北）
   */
  public neResize() {
    this.setCursor('ne-resize');
  }
  /**
   * 光标指示可移动的方向 左上方（西北）
   */
  public nwResize() {
    this.setCursor('nw-resize');
  }
  /**
   * 光标指示可移动的方向右下方（东南）
   */
  public seResize() {
    this.setCursor('se-resize');
  }
  /**
   * 光标指示可移动的方向左下方（西南）
   */
  public swResize() {
    this.setCursor('sw-resize');
  }

  /**
   * 光标指示可以在上下方向移动
   */
  public nsResize() {
    this.setCursor('ns-resize');
  }
  /**
   * 光标指示可以在左右方向移动
   */
  public ewResize() {
    this.setCursor('ew-resize');
  }
}

export default CursorAction;
