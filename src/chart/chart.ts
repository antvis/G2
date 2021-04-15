import { View } from './view';

/**
 * 图表入口类，继承自 View，会额外增加：
 * - 初始化 G.Canvas
 * - resize 的处理
 */
export class Chart extends View {
  constructor() {
    super();

    this.initGCanvas();
    this.bindResizeEvent();
  }

  /**
   * 初始化 G 的容器
   */
  private initGCanvas() {}

  /**
   * 绑定 window.resize 事件，用于做 autoFit
   */
  private bindResizeEvent() {
    document.addEventListener('resize', this.onDocumentResize);
  }

  private onDocumentResize = () => {
    this.forceFit();
  };

  /**
   * 重新设置画布的大小
   * @param width
   * @param height
   */
  public resize(width: number, height: number) {}

  /**
   * 强制触发一次 Fit，让图表大小和容器保持一致
   */
  public forceFit() {
    this.resize(100, 100);
  }

  public destroy() {
    super.destroy();

    // 移除事件
    document.removeEventListener('resize', this.onDocumentResize);
  }
}
