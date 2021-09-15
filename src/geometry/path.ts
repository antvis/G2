import { FIELD_ORIGIN } from '../constant';
import { MappingDatum, ShapeInfo } from '../interface';
import Geometry, { GeometryCfg } from './base';
import Element from './element';
/** 引入对应的 ShapeFactory */
import './shape/line';
import { isModelChange } from './util/is-model-change';
import { diff } from './util/diff';

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
  protected createElements(mappingDataArray: MappingDatum[][], index: number, isUpdate: boolean = false) {
    // Path 的每个 element 对应一组数据
    const keyData = new Map<string, MappingDatum[]>();
    const keys: string[] = [];

    for (let i = 0; i < mappingDataArray.length; i++) {
      const mappingData = mappingDataArray[i];
      const key = this.getElementId(mappingData);
      keys.push(key);
      keyData.set(key, mappingData);
    }

    const { enter, update } = diff(this.lastElementsMap, keys);

    for (const key of enter) {
      const mappingData = keyData.get(key);
      const shapeFactory = this.getShapeFactory();
      const shapeCfg = this.getShapeInfo(mappingData);
      const element = new Element({
        shapeFactory,
        container: this.container,
        offscreenGroup: this.getOffscreenGroup(),
      });
      element.geometry = this;
      element.animate = this.animateOption;
      element.draw(shapeCfg, isUpdate); // 绘制 shape
      this.elementsMap[key] = element;
      this.elements.push(element);
    }

    for (const key of update) {
      const mappingData = keyData.get(key);
      const element = this.lastElementsMap[key];
      const shapeCfg = this.getShapeInfo(mappingData);
      const preShapeCfg = element.getModel();
      if (this.isCoordinateChanged || isModelChange(preShapeCfg, shapeCfg)) {
        element.animate = this.animateOption;
        // 通过绘制数据的变更来判断是否需要更新，因为用户有可能会修改图形属性映射
        element.update(shapeCfg); // 更新对应的 element
      }
      this.elementsMap[key] = element;
      this.elements.push(element);
      delete this.lastElementsMap[key];
    }
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
