import { IElement, IGroup, isAllowCapture, IShape } from '@antv/g-base';
import { MappingDatum, Shape, ShapeInfo } from '../interface';
import Geometry from './base';
/** 引入 Point 对应的 ShapeFactory */
import './shape/point';

/**
 * Point 几何标记。
 * 常用于绘制点图。
 */
export default class Point extends Geometry {
  public readonly type: string = 'point';
  public readonly shapeType: string = 'point';
  protected generatePoints: boolean = true;

  /**
   * 获取一个点的绘制信息。
   * @param mappingDatum
   * @returns draw cfg
   */
  protected getDrawCfg(mappingDatum: MappingDatum): ShapeInfo {
    const shapeCfg = super.getDrawCfg(mappingDatum);

    return {
      ...shapeCfg,
      isStack: !!this.getAdjust('stack'), // 层叠点图
    };
  }

  public getShapesByHitPoint(x: number, y: number, ev: Event): Shape[] {
    // 这里可以参照g-base的getShape方法，返回所有符合条件的 shape
    const container = this.container;
    // 如果 container 不存在 或者 不支持拾取，则直接返回
    if (!container || !isAllowCapture(this.container)) {
      return null;
    }
    const children = container.getChildren();
    let shape;
    // 如果容器是 group
    if (!container.isCanvas()) {
      let v = [x, y, 1];
      // 将 x, y 转换成对应于 group 的局部坐标
      v = container.invertFromMatrix(v);
      if (!container.isClipped(v[0], v[1])) {
        shape = this._findShape(children, v[0], v[1], ev);
      }
    } else {
      shape = this._findShape(children, x, y, ev);
    }
    return shape;
  }

  private _findShape(children: IElement[], x: number, y: number, ev: Event) {
    const shapes = [];
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      if (isAllowCapture(child)) {
        if (child.isGroup()) {
          shapes.push((child as IGroup).getShape(x, y, ev));
        } else if ((child as IShape).isHit(x, y)) {
          shapes.push(child);
        }
      }
    }
    return shapes;
  }

}
