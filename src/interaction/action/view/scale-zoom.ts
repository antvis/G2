import { each } from '@antv/util';
import TransformAction from './scale-transform';

/**
 * 缩放 Scale 的 Action
 */
class ScaleTranslate extends TransformAction {
  /**
   * 缩小
   */
  public zoomIn() {
    const dims = this.dims;
    each(dims, (dim) => {
      this.zoomDim(dim, 0.1);
    });
    this.context.view.render(true);
  }

  /**
   * 放大
   */
  public zoomOut() {
    const dims = this.dims;
    each(dims, (dim) => {
      this.zoomDim(dim, -0.1);
    });
    this.context.view.render(true);
  }

  // 缩放度量
  private zoomDim(dim, dRatio) {
    if (this.hasDim(dim)) {
      const scale = this.getScale(dim);
      if (scale.isLinear) {
        this.zoomLinear(dim, scale, dRatio);
      }
      //  else { // 暂时仅处理连续字段
      // this.zoomCategory(dim, scale, normalPoint);
      // }
    }
  }
  // linear 度量平移
  private zoomLinear(dim, scale, dRatio) {
    const view = this.context.view;
    // 只有第一次缓存，否则无法回滚
    if (!this.cacheScaleDefs[dim]) {
      this.cacheScaleDefs[dim] = {
        // @ts-ignore
        nice: scale.nice,
        min: scale.min,
        max: scale.max,
      };
    }
    // 使用使用原始度量作为缩放标准
    const scaleDef = this.cacheScaleDefs[dim];
    const range = scaleDef.max - scaleDef.min;
    const { min, max } = scale;
    const d = dRatio * range;
    view.scale(scale.field, {
      // @ts-ignore
      nice: false,
      min: min - d,
      max: max + d,
    });
  }

  // 平移分类的度量
  // private translateCategory(dim, scale, normalPoint) {
  // }
}

export default ScaleTranslate;
