import { deepMix } from '@antv/util';
import Action from '../../base';
import { LooseObject } from '../../../../interface';

/**
 * @ignore
 * 辅助框 Action 的基类
 */
abstract class MultipleMaskBase extends Action {
  // mask 图形
  protected maskShapes = [];
  // 开始 mask 的标记
  protected starting = false;
  // 开始移动的标记
  protected moving = false;
  // 记录 mask 节点
  protected recordPoints = null;
  protected preMovePoint = null;
  protected shapeType = 'path';
  protected maskType = 'multi-mask';

  /**
   * 获取当前的位置
   */
  protected getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }

  /**
   * 触发 mask 的事件
   * @param type
   */
  protected emitEvent(type) {
    const eventName = `${this.maskType}:${type}`;
    const view = this.context.view;
    const event = this.context.event;
    const target = {
      type: this.shapeType,
      name: this.maskType,
      get: (key: string) => (target.hasOwnProperty(key) ? target[key] : undefined),
    };
    view.emit(eventName, {
      target,
      maskShapes: this.maskShapes,
      multiPoints: this.recordPoints,
      x: event.x,
      y: event.y,
    });
  }

  /**
   * 创建 mask
   * @param index
   */
  private createMask(index: number) {
    const view = this.context.view;
    const points = this.recordPoints[index];
    const maskAttrs = this.getMaskAttrs(points);
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
    this.maskShapes.push(maskShape);
  }

  /**
   * 获取 mask shape attributes
   * @param points
   */
  protected abstract getMaskAttrs(points: number[]): LooseObject;

  /**
   * 生成 mask 的路径
   */
  protected getMaskPath(points) {
    return [];
  }

  /**
   * 显示
   */
  public show() {
    if (this.maskShapes.length > 0) {
      this.maskShapes.forEach((maskShape) => maskShape.show());
      this.emitEvent('show');
    }
  }

  /**
   * 开始
   */
  public start(arg?: { maskStyle: LooseObject }) {
    this.recordPointStart();

    this.starting = true;
    // 开始时，保证移动结束
    this.moving = false;
    // 开始第 index 个 mask
    const index = this.recordPoints.length - 1;
    this.createMask(index);
    // 开始时设置 capture: false，可以避免创建、resize 时触发事件
    this.updateShapesCapture(false);
    this.updateMask(arg?.maskStyle);
    this.emitEvent('start');
  }

  /**
   * 开始移动
   */
  public moveStart() {
    this.moving = true;
    this.preMovePoint = this.getCurrentPoint();
    this.updateShapesCapture(false);
  }

  /**
   * 移动 mask
   */
  public move() {
    if (!this.moving || this.maskShapes.length === 0) {
      return;
    }
    const currentPoint = this.getCurrentPoint();
    const preMovePoint = this.preMovePoint;
    const dx = currentPoint.x - preMovePoint.x;
    const dy = currentPoint.y - preMovePoint.y;

    // 只移动当前 event (x, y) 所在的某个 mask
    const index = this.getCurMaskShapeIndex();
    if (index > -1) {
      this.recordPoints[index].forEach((point) => {
        point.x += dx;
        point.y += dy;
      });
      this.updateMask();
      this.emitEvent('change');
      this.preMovePoint = currentPoint;
    }
  }

  /**
   * 更新
   * @param maskStyle
   */
  protected updateMask(maskStyle?: LooseObject) {
    this.recordPoints.forEach((points, index) => {
      const attrs = deepMix({}, this.getMaskAttrs(points), maskStyle);
      this.maskShapes[index].attr(attrs);
    });
  }

  /**
   * 大小变化
   */
  public resize() {
    if (this.starting && this.maskShapes.length > 0) {
      this.recordPointContinue();

      this.updateMask();
      this.emitEvent('change');
    }
  }

  /**
   * 结束移动
   */
  public moveEnd() {
    this.moving = false;
    this.preMovePoint = null;
    this.updateShapesCapture(true);
  }

  /**
   * 结束
   */
  public end() {
    this.starting = false;
    this.emitEvent('end');
    this.updateShapesCapture(true);
  }

  /**
   * 隐藏
   */
  public hide() {
    if (this.maskShapes.length > 0) {
      this.maskShapes.forEach((maskShape) => maskShape.hide());
      this.emitEvent('hide');
    }
  }

  /**
   * 清除某个 mask
   */
  public remove() {
    const index = this.getCurMaskShapeIndex();
    if (index > -1) {
      // event (x, y) 在的某个 mask 区域内时，清除该 mask
      this.recordPoints.splice(index, 1);
      this.maskShapes[index].remove();
      this.maskShapes.splice(index, 1);
      this.preMovePoint = null;
      this.updateShapesCapture(true);
      this.emitEvent('change');
    }
  }

  /**
   * 清除全部 mask
   */
  public clearAll() {
    this.recordPointClear();
    this.maskShapes.forEach((maskShape) => maskShape.remove());
    this.maskShapes = [];
    this.preMovePoint = null;
  }

  /**
   * 清除
   */
  public clear() {
    const index = this.getCurMaskShapeIndex();
    if (index === -1) {
      this.recordPointClear();
      this.maskShapes.forEach((maskShape) => maskShape.remove());
      this.maskShapes = [];
      this.emitEvent('clearAll');
    } else {
      this.recordPoints.splice(index, 1);
      this.maskShapes[index].remove();
      this.maskShapes.splice(index, 1);
      this.preMovePoint = null;
      this.emitEvent('clearSingle');
    }
    this.preMovePoint = null;
  }

  /**
   * 销毁
   */
  public destroy() {
    this.clear();
    super.destroy();
  }

  /**
   * 获取 mask 节点记录
   */
  protected getRecordPoints() {
    return [...(this.recordPoints ?? [])];
  }

  /**
   * 创建 mask 节点记录
   */
  protected recordPointStart() {
    const recordPoints = this.getRecordPoints();
    const currentPoint = this.getCurrentPoint();
    this.recordPoints = [...recordPoints, [currentPoint]];
  }

  /**
   * 持续记录 mask 节点
   */
  protected recordPointContinue() {
    const recordPoints = this.getRecordPoints();
    const currentPoint = this.getCurrentPoint();
    const lastPoints = recordPoints.splice(-1, 1)[0] || [];
    lastPoints.push(currentPoint);
    this.recordPoints = [...recordPoints, lastPoints];
  }

  /**
   * 清除 mask 节点 记录
   */
  protected recordPointClear() {
    this.recordPoints = [];
  }

  /**
   * 设置 capture
   * false: 避免创建、resize 时触发事件
   * true: 正常触发其它事件
   * @param isCapture
   */
  protected updateShapesCapture(isCapture: boolean) {
    this.maskShapes.forEach((maskShape) => maskShape.set('capture', isCapture));
  }

  /**
   *
   * @returns 获取当前 event (x, y) 所在 maskShape 的 index
   */
  protected getCurMaskShapeIndex() {
    const currentPoint = this.getCurrentPoint();
    return this.maskShapes.findIndex((maskShape) => {
      const { width, height, r } = maskShape.attrs;
      const isEmpty = width === 0 || height === 0 || r === 0;
      return !isEmpty && maskShape.isHit(currentPoint.x, currentPoint.y);
    });
  }
}

export default MultipleMaskBase;
