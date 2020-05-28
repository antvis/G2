import { each } from '@antv/util';
import { Point } from '../../../dependents';
import TransformAction from './scale-transform';

/**
 * 拖拽 Scale 的 Action
 * @ignore
 */
class ScaleTranslate extends TransformAction {
  protected startPoint: Point = null;
  protected starting = false;
  private startCache = {};
  /**
   * 开始
   */
  public start() {
    this.startPoint = this.context.getCurrentPoint();
    this.starting = true;
    const dims = this.dims;
    each(dims, (dim) => {
      const scale = this.getScale(dim);
      const { min, max, values } = scale;
      this.startCache[dim] = { min, max, values };
    });
  }

  // 平移分类的度量
  // private translateCategory(dim, scale, normalPoint) {
  // }

  /**
   * 结束
   */
  public end() {
    this.startPoint = null;
    this.starting = false;
    this.startCache = {};
  }

  /**
   * 平移
   */
  public translate() {
    if (!this.starting) {
      return;
    }
    const startPoint = this.startPoint;
    const coord = this.context.view.getCoordinate();
    const currentPoint = this.context.getCurrentPoint();
    const normalStart = coord.invert(startPoint);
    const noramlCurrent = coord.invert(currentPoint);
    const dx = noramlCurrent.x - normalStart.x;
    const dy = noramlCurrent.y - normalStart.y;
    const view = this.context.view;
    const dims = this.dims;
    each(dims, (dim) => {
      this.translateDim(dim, { x: dx * -1, y: dy * -1 });
    });
    view.render(true);
  }

  // 平移度量
  private translateDim(dim, normalPoint) {
    if (this.hasDim(dim)) {
      const scale = this.getScale(dim);
      if (scale.isLinear) {
        this.translateLinear(dim, scale, normalPoint);
      }
      //  else { // 暂时仅处理连续字段
      // this.translateCategory(dim, scale, normalPoint);
      // }
    }
  }
  // linear 度量平移
  private translateLinear(dim, scale, normalPoint) {
    const view = this.context.view;
    const { min, max } = this.startCache[dim];
    const range = max - min;
    const d = normalPoint[dim] * range;
    // 只有第一次缓存，否则无法回滚
    if (!this.cacheScaleDefs[dim]) {
      this.cacheScaleDefs[dim] = {
        // @ts-ignore
        nice: scale.nice,
        min,
        max,
      };
    }
    view.scale(scale.field, {
      // @ts-ignore
      nice: false,
      min: min + d,
      max: max + d,
    });
  }

  // 平移分类的度量
  // private translateCategory(dim, scale, normalPoint) {
  // }

  /**
   * 回滚
   */
  public reset() {
    super.reset();
    this.startPoint = null;
    this.starting = false;
  }
}

export default ScaleTranslate;
