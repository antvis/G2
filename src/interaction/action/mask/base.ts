import { each } from '@antv/util';
import Action from '../base';
import { LooseObject } from '../../../interface';

/**
 * @ignore
 * 辅助框 Action 的基类
 */
abstract class MaskBase extends Action {
  // mask 图形
  protected maskShape = null;
  // 组成 mask 的各个点
  protected points = [];
  // 开始 mask 的标记
  protected starting = false;
  // 开始移动的标记
  protected moving = false;
  protected preMovePoint = null;

  protected shapeType = 'path';
  // 获取当前的位置
  protected getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }
  // 触发 mask 的事件
  protected emitEvent(type) {
    const eventName = `mask:${type}`;
    const view = this.context.view;
    const event = this.context.event;
    view.emit(eventName, {
      target: this.maskShape,
      shape: this.maskShape,
      points: this.points,
      x: event.x,
      y: event.y,
    });
  }

  // 创建 mask
  private createMask() {
    const view = this.context.view;
    const maskAttrs = this.getMaskAttrs();
    const maskShape = view.foregroundGroup.addShape({
      type: this.shapeType,
      name: 'mask',
      draggable: true,
      attrs: {
        fill: '#C5D4EB',
        opacity: 0.3,
        ...maskAttrs,
      },
    });
    return maskShape;
  }

  protected abstract getMaskAttrs(): LooseObject;

  // 生成 mask 的路径
  protected getMaskPath() {
    return [];
  }

  /**
   * 显示
   */
  public show() {
    if (this.maskShape) {
      this.maskShape.show();
      this.emitEvent('show');
    }
  }

  /**
   * 开始
   */
  public start() {
    this.starting = true;
    // 开始时，保证移动结束
    this.moving = false;
    this.points = [this.getCurrentPoint()];
    if (!this.maskShape) {
      this.maskShape = this.createMask();
      // 开始时设置 capture: false，可以避免创建、resize 时触发事件
      this.maskShape.set('capture', false);
    }
    this.updateMask();
    this.emitEvent('start');
  }

  /**
   * 开始移动
   */
  public moveStart() {
    this.moving = true;
    this.preMovePoint = this.getCurrentPoint();
  }
  /**
   * 移动 mask
   */
  public move() {
    if (!this.moving || !this.maskShape) {
      return;
    }
    const currentPoint = this.getCurrentPoint();
    const preMovePoint = this.preMovePoint;
    const dx = currentPoint.x - preMovePoint.x;
    const dy = currentPoint.y - preMovePoint.y;
    const points = this.points;
    each(points, (point) => {
      point.x += dx;
      point.y += dy;
    });
    this.updateMask();
    this.emitEvent('change');
    this.preMovePoint = currentPoint;
  }

  protected updateMask() {
    const attrs = this.getMaskAttrs();
    this.maskShape.attr(attrs);
  }

  /**
   * 结束移动
   */
  public moveEnd() {
    this.moving = false;
    this.preMovePoint = null;
  }

  /**
   * 结束
   */
  public end() {
    this.starting = false;
    this.emitEvent('end');
    if (this.maskShape) {
      this.maskShape.set('capture', true);
    }
  }

  /**
   * 隐藏
   */
  public hide() {
    if (this.maskShape) {
      this.maskShape.hide();
      this.emitEvent('hide');
    }
  }

  /**
   * 大小变化
   */
  public resize() {
    // 只有进行中，才会允许大小变化
    if (this.starting && this.maskShape) {
      this.points.push(this.getCurrentPoint());
      this.updateMask();
      this.emitEvent('change');
    }
  }

  /**
   * 销毁
   */
  public destroy() {
    this.points = [];
    if (this.maskShape) {
      this.maskShape.remove();
    }
    this.maskShape = null;
    this.preMovePoint = null;
    super.destroy();
  }
}

export default MaskBase;
