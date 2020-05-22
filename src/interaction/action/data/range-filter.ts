import { Point, Scale } from '../../../dependents';
import { FilterCondition } from '../../../interface';

import { View } from '../../../chart';
import Action from '../base';
import { distance, isMask } from '../util';

// 获取对应的 scale
function getFilter(scale: Scale, dim: string, point1: Point, point2: Point): FilterCondition {
  let min = Math.min(point1[dim], point2[dim]);
  let max = Math.max(point1[dim], point2[dim]);
  const [rangeMin, rangeMax] = scale.range;
  // 约束值在 scale 的 range 之间
  if (min < rangeMin) {
    min = rangeMin;
  }
  if (max > rangeMax) {
    max = rangeMax;
  }
  // 范围大于整个 view 的范围，则返回 null
  if (min === rangeMax && max === rangeMax) {
    return null;
  }
  const minValue = scale.invert(min);
  const maxValue = scale.invert(max);
  if (scale.isCategory) {
    const minIndex = scale.values.indexOf(minValue);
    const maxIndex = scale.values.indexOf(maxValue);
    const arr = scale.values.slice(minIndex, maxIndex + 1);
    return (value) => {
      return arr.includes(value);
    };
  } else {
    return (value) => {
      return value >= minValue && value <= maxValue;
    };
  }
}

/**
 * 范围过滤的 Action
 * @ignore
 */
class RangeFilter extends Action {
  /** 允许外部传入 dims */
  protected cfgFields: ['dims'];
  /**
   * 范围过滤生效的字段/维度，可以是 x, y
   */
  protected dims: string[] = ['x', 'y'];
  /** 起始点 */
  protected startPoint: Point = null;

  private isStarted: boolean = false;

  // x,y 是否生效
  private hasDim(dim: string) {
    return this.dims.includes(dim);
  }

  /**
   * 开始范围过滤，记录范围过滤的起点
   */
  public start() {
    const context = this.context;
    this.isStarted = true;
    this.startPoint = context.getCurrentPoint();
  }

  /**
   * 过滤，以开始的点和当前点对数据进行过滤
   */
  public filter() {
    let startPoint;
    let currentPoint;
    if (isMask(this.context)) {
      const maskShape = this.context.event.target;
      const bbox = maskShape.getCanvasBBox();
      startPoint = { x: bbox.x, y: bbox.y };
      currentPoint = { x: bbox.maxX, y: bbox.maxY };
    } else {
      if (!this.isStarted) {
        // 如果没有开始，则不执行过滤
        return;
      }
      startPoint = this.startPoint;
      currentPoint = this.context.getCurrentPoint();
    }
    if (Math.abs(startPoint.x - currentPoint.x) < 5 || Math.abs(startPoint.x - currentPoint.y) < 5) {
      // 距离过小也不生效
      return;
    }
    const view = this.context.view;
    const coord = view.getCoordinate();
    const normalCurrent = coord.invert(currentPoint);
    const normalStart = coord.invert(startPoint);
    // 设置 x 方向的 filter
    if (this.hasDim('x')) {
      const xScale = view.getXScale();
      const filter = getFilter(xScale, 'x', normalCurrent, normalStart);
      this.filterView(view, xScale.field, filter);
    }
    // 设置 y 方向的 filter
    if (this.hasDim('y')) {
      const yScale = view.getYScales()[0];
      const filter = getFilter(yScale, 'y', normalCurrent, normalStart);
      this.filterView(view, yScale.field, filter);
    }
    this.reRender(view);
  }

  /**
   * 结束
   */
  public end() {
    this.isStarted = false;
  }

  /**
   * 取消同当前 Action 相关的过滤，指定的 x,y
   */
  public reset() {
    const view = this.context.view;
    this.isStarted = false;
    if (this.hasDim('x')) {
      const xScale = view.getXScale();
      this.filterView(view, xScale.field, null); // 取消过滤
    }
    if (this.hasDim('y')) {
      // y 轴过滤仅取第一个 yScale
      const yScale = view.getYScales()[0];
      this.filterView(view, yScale.field, null); // 取消过滤
    }
    this.reRender(view);
  }

  /**
   * 对 view 进行过滤
   */
  protected filterView(view: View, field: string, filter: FilterCondition) {
    view.filter(field, filter);
  }

  /**
   * 重新渲染
   * @param view
   */
  protected reRender(view: View) {
    view.render(true);
  }
}

export default RangeFilter;
