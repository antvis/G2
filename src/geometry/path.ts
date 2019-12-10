import { get } from '@antv/util';
import { FIELD_ORIGIN } from '../constant';
import { Data, Datum, MappingDatum, Point, RangePoint, ShapeInfo } from '../interface';
import Geometry, { GeometryCfg } from './base';
import Element from './element';
/** 引入对应的 ShapeFactory */
import './shape/line';
import { isModelChange } from './util/is-model-change';

export interface PathCfg extends GeometryCfg {
  /** 是否连接空值 */
  connectNulls?: boolean;
}

export default class Path extends Geometry {
  public readonly type: string = 'path';
  public readonly shapeType: string = 'line';
  /** 是否连接空值 */
  public connectNulls: boolean;

  constructor(cfg: PathCfg) {
    super(cfg);

    const { connectNulls = false } = cfg;
    this.connectNulls = connectNulls;
  }

  protected createElements(mappingData: MappingDatum[]): Element[] {
    // Path 的每个 element 对应一组数据
    const { lastElementsMap, elementsMap, elements, theme, container } = this;
    const elementId = this.getElementId(mappingData[0]);
    const shapeCfg = this.getShapeInfo(mappingData);

    let result = lastElementsMap[elementId];
    if (!result) {
      const shapeFactory = this.getShapeFactory();
      result = new Element({
        data: shapeCfg.data,
        model: shapeCfg,
        shapeType: shapeCfg.shape || shapeFactory.defaultShapeType,
        theme: get(theme, ['geometries', this.shapeType], {}),
        shapeFactory,
        container,
        animate: this.animateOption,
        offscreenGroup: this.getOffscreenGroup(container),
      });
      result.geometry = this;
    } else {
      // element 已经创建
      const preShapeCfg = result.model;
      if (isModelChange(preShapeCfg, shapeCfg)) {
        // 更新动画配置，用户有可能在更新之前有对动画进行配置操作
        result.animate = this.animateOption;
        // 通过绘制数据的变更来判断是否需要更新，因为用户有可能会修改图形属性映射
        result.update(shapeCfg); // 更新对应的 element
      }
      delete lastElementsMap[elementId];
    }

    elements.push(result);
    elementsMap[elementId] = result;

    return elements;
  }

  protected getPoints(mappingData: MappingDatum[]): Point[] | RangePoint[] {
    return mappingData.map((obj: MappingDatum) => {
      return {
        x: obj.x,
        y: obj.y,
      };
    });
  }

  private getShapeInfo(mappingData: MappingDatum[]): ShapeInfo {
    const shapeCfg = this.getDrawCfg(mappingData[0]);

    return {
      ...shapeCfg,
      mappingData,
      data: this.getData(mappingData),
      isStack: !!this.getAdjust('adjust'),
      points: this.getPoints(mappingData),
      connectNulls: this.connectNulls,
    };
  }

  private getData(mappingData: MappingDatum[]): Data {
    return mappingData.map((obj: Datum) => {
      return obj[FIELD_ORIGIN];
    });
  }
}
