import { Action } from '..';

const DIM_X = 'x';
const DIM_Y = 'y';

/**
 * Scale translate
 * @ignore
 */
class ScaleTranslate extends Action {
  protected dims = [DIM_X, DIM_Y];
  protected cfgFields = ['dims'];
  protected cacheScaleDefs = {};

  // 是否支持对应字段的平移
  protected hasDim(dim) {
    return this.dims.includes(dim);
  }

  protected getScale(dim) {
    const view = this.context.view;
    if (dim === 'x') {
      return view.getXScale();
    } else {
      return view.getYScales()[0];
    }
  }

  private resetDim(dim) {
    const view = this.context.view;
    if (this.hasDim(dim) && this.cacheScaleDefs[dim]) {
      const scale = this.getScale(dim);
      view.scale(scale.field, this.cacheScaleDefs[dim]);
      this.cacheScaleDefs[dim] = null;
    }
  }

  /**
   * 回滚
   */
  public reset() {
    this.resetDim(DIM_X);
    this.resetDim(DIM_Y);
    const view = this.context.view;
    view.render(true);
  }
}

export default ScaleTranslate;
