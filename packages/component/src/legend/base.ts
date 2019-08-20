/**
 * @description Legend 图例基类
 */
import * as _ from '@antv/util';
import Guide from '../base';
import { LegendCfg } from '../interface';

export default abstract class Legend extends Guide {

  constructor(cfg: LegendCfg) {
    super({
      /**
       * 图例类型
       */
      type: 'base',
      /**
       * 图例标题
       */
      title: null,
      /**
       * 图例项集合
       */
      items: null,
      /**
       * 图例文本显示格式化回调函数
       */
      formatter: null,
      /**
       * 图例整体在 X 轴方向的偏移量
       */
      offsetX: 0,
      /**
       * 图例整体在 Y 轴方向上的偏移量
       */
      offsetY: 0,
      ...cfg,
    });
    this.init();
    this.render();
    this.bindEvents();
  }

  /**
   * 渲染图例内容
   */
  render() {
    this.renderTitle(); // 渲染标题
    this.renderItems(); // 渲染图例项
  }

  /**
   * @override
   * 获取图例的宽度
   */
  getWidth(): number {
    const container = this.get('container');
    const bbox = container.getBBox();
    return bbox.width;
  }

  /**
   * @override
   * 获取图例的高度
   */
  getHeight(): number {
    const container = this.get('container');
    const bbox = container.getBBox();
    return bbox.height;
  }

  /**
   * @override
   * 将图例移动至 (x, y）坐标点位置
   * @param x x 坐标
   * @param y y 坐标
   */
  moveTo(x: number, y: number) {
    const container = this.get('container');
    container.move(x, y);
    this.set('x', x);
    this.set('y', y);
  }
  /**
   * 绘制图例
   */
  draw() {
    this.get('canvas').draw();
  }
  /* 格式化 legend 显示数据 */
  protected formatterValue(v) {
    const formatter = this.get('formatter') || _.identity;
    return formatter.call(this, v);
  }

  abstract init(): void;
  abstract renderTitle(): void;
  abstract renderItems(): void;
  abstract bindEvents(): void;
}
