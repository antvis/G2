import { FIELD_ORIGIN } from '../constant';
import { MappingDatum, ShapeInfo } from '../interface';
import Geometry, { GeometryCfg } from './base';
import Element from './element';
/** 引入对应的 ShapeFactory */
import './shape/line';
import { isModelChange } from './util/is-model-change';

/** Path 构造函数参数类型 */
export interface PathCfg extends GeometryCfg {
  /** 是否连接空值 */
  connectNulls?: boolean;
  /** 单个孤立数据点是否展示 */
  showSinglePoint?: boolean;
}

/**
 * Path 几何标记。
 * 用于绘制路径图等。
 */
export default class Path extends Geometry {
  public readonly type: string = 'path';
  public readonly shapeType: string = 'line';
  /** 是否连接空值 */
  public connectNulls: boolean;
  /** 单个孤立数据点是否展示 */
  public showSinglePoint: boolean;

  constructor(cfg: PathCfg) {
    super(cfg);

    const { connectNulls = false, showSinglePoint = true } = cfg;
    this.connectNulls = connectNulls;
    this.showSinglePoint = showSinglePoint;
  }

  /**
   * 创建所有的 Element 实例，对于 Path、Line、Area，一组数据对应一个 Element。
   * @param mappingData
   * @param [isUpdate]
   * @returns elements
   */
  protected createElements(mappingData: MappingDatum[], index: number, isUpdate: boolean = false): Element[] {
    // Path 的每个 element 对应一组数据
    const { lastElementsMap, elementsMap, elements, container } = this;
    const elementId = this.getElementId(mappingData);
    const shapeCfg = this.getShapeInfo(mappingData);

    let result = lastElementsMap[elementId];
    if (!result) {
      const shapeFactory = this.getShapeFactory();

      result = new Element({
        shapeFactory,
        container,
        offscreenGroup: this.getOffscreenGroup(),
      });
      result.geometry = this;
      result.animate = this.animateOption;
      result.draw(shapeCfg, isUpdate); // 绘制 shape
    } else {
      // element 已经创建
      const preShapeCfg = result.getModel();
      if (this.isCoordinateChanged || isModelChange(preShapeCfg, shapeCfg)) {
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
      data.push(obj[FIELD_ORIGIN]);
    }

    return {
      points,
      data,
    };
  }

  private getShapeInfo(mappingData: MappingDatum[]): ShapeInfo {
    const shapeCfg = this.getDrawCfg(mappingData[0]);
    const { points, data } = this.getPointsAndData(mappingData);
    shapeCfg.mappingData = mappingData;
    shapeCfg.data = data;
    shapeCfg.isStack = !!this.getAdjust('stack');
    shapeCfg.points = points;
    shapeCfg.connectNulls = this.connectNulls;
    shapeCfg.showSinglePoint = this.showSinglePoint;

    return shapeCfg;
  }
}
