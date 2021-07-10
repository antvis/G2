import { Geometry } from '../geometry';
import { ORIGINAL_FIELD } from '../../constant';
import { MappingDatum, ShapeInfo } from '../../types/geometry';
import { diff } from '../../util/diff';
import { Element } from '../element';
import { LineGeometryOption } from './types';

import './shapes';

/**
 * @description Line 几何标记
 *
 * 常用于折线图的绘制。
 */
export class Line extends Geometry<LineGeometryOption> {
  /**
   * geometry type
   */
  public type = 'line';

  /**
   * shape type
   */
  public defaultShapeType = 'line';

  /**
   * todo 折线图 element 的 id 生成逻辑
   * @override line geometry 的 id 规则
   */
  protected getElementId(mappingDatum: MappingDatum[]): string {
    const originalData = mappingDatum[0][ORIGINAL_FIELD];

    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return `${originalData[xScale.getField()]}-${originalData[yScale.getField()]}`;
  }

  /**
   * @overrider 创建折线图的 elements
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

    for (let i = 0; i < mappingDataArray.length; i++) {
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
   * 获取组成一条线（一组数据）的所有点以及数据
   * @param mappingData 映射后的数组
   */
  protected getPointsAndData(mappingData: MappingDatum[]) {
    const points = [];
    const data = [];

    for (let i = 0, len = mappingData.length; i < len; i++) {
      const obj = mappingData[i];
      points.push({
        x: obj.x,
        y: obj.y,
      });
      data.push(obj[ORIGINAL_FIELD]);
    }

    return {
      points,
      data,
    };
  }

  /**
   * @override 获取创建 Element 组件的配置
   */
  protected getShapeInfo(mappingData: MappingDatum[]): ShapeInfo {
    const shapeInfo = this.getElementShapeInfo(mappingData[0]);

    const { points, data } = this.getPointsAndData(mappingData);
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
