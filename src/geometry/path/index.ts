import { Geometry } from '../geometry';
import { ORIGINAL_FIELD } from '../../constant';
import { diff } from '../../util/diff';
import { Element } from '../element';
import type { MappingDatum, ShapeInfo } from '../../types/geometry';
import type { PathGeometryOption } from './types';

import './shapes';

/**
 * @description Path 几何标记
 *
 * 常用于路径图的绘制。
 */
export class Path<O extends PathGeometryOption = PathGeometryOption> extends Geometry<O> {
  /**
   * geometry type
   * @override
   */
  public type = 'path';

  /**
   * 默认的 shape type
   * @override
   */
  public defaultShapeType = 'line';

  /**
   * todo path element 的 id 生成逻辑
   * @override path geometry 的 id 规则
   */
  protected getElementId(mappingDatum: MappingDatum[]): string {
    const originalData = mappingDatum[0][ORIGINAL_FIELD];

    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return `${originalData[xScale.field]}-${originalData[yScale.field]}`;
  }

  /**
   * @overrider 创建 elements
   * @todo 是否可以统一 createElement，而不是复写
   *
   * 每一个分组一个 Element
   * 存在则更新，不存在则创建，最后全部更新到 elementsMap 中
   * @param mappingData
   */
  protected createElements(mappingDataArray: MappingDatum[][]): void {
    // Path 的每个 element 对应一组数据

    // 根据需要生成的 elements 和当前已有的 elements，做一个 diff
    // 1. 更新已有的
    // 2. 创建新增的
    // 3. 销毁删除的
    const newElementIds = [];
    const datumMap = new Map<string, MappingDatum[]>();

    for (let i = 0; i < mappingDataArray.length; i += 1) {
      const mappingData = mappingDataArray[i];
      if (mappingData.length) {
        const key = this.getElementId(mappingData);
        newElementIds.push(key);

        datumMap.set(key, mappingData);
      }
    }

    const { added, removed, updated } = diff(newElementIds, this.elementsMap);

    // 新增的
    added.forEach((key: string) => {
      const { container } = this.options;

      const mappingData = datumMap.get(key);

      const shapeInfo = this.getShapeInfo(mappingData); // 获取绘制图形的配置信息

      const element = new Element({
        id: key,
        geometry: this,
        container,
        animate: this.animateOption,
      });

      element.draw(shapeInfo); // 绘制

      this.elementsMap.set(key, element);
    });

    // 删除的
    removed.forEach((key: string) => {
      const el = this.elementsMap.get(key);
      el.destroy();

      this.elementsMap.delete(key);
    });

    //  todo 更新的
    updated.forEach((key: string) => {
      const el = this.elementsMap.get(key);

      const mappingData = datumMap.get(key);
      const shapeInfo = this.getShapeInfo(mappingData); // 获取绘制图形的配置信息

      el.update(shapeInfo);
    });
  }

  /**
   * @override 获取创建 Element 组件的配置
   */
  protected getShapeInfo(mappingData: MappingDatum[]): ShapeInfo {
    const shapeInfo = this.getElementShapeInfo(mappingData[0]);

    const points = [];
    const data = [];

    // 获取组成一条线（一组数据）的所有点以及数据
    for (let i = 0, len = mappingData.length; i < len; i += 1) {
      const obj = mappingData[i];
      points.push({
        x: obj.x,
        y: obj.y,
      });
      data.push(obj[ORIGINAL_FIELD]);
    }
    shapeInfo.mappingData = mappingData;
    shapeInfo.data = data;
    shapeInfo.isStack = !!this.getAdjust('stack');
    shapeInfo.points = points;

    const { connectNulls = false, showSinglePoint = true } = this.options;
    shapeInfo.connectNulls = connectNulls;
    shapeInfo.showSinglePoint = showSinglePoint;

    return shapeInfo;
  }
}
