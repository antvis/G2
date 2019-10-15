import * as _ from '@antv/util';
import { FIELD_ORIGIN } from '../constant';
import Element from '../element';
import { Data, Datum } from '../interface';
/** 引入对应的 ShapeFactory */
import '../shape/line';
import Geometry, { GeometryCfg } from './base';
import { splitData } from './util/split-data';

interface PathCfg extends GeometryCfg {
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

  protected createElements(mappedArray: Data): Element[] {
    // path 的每个 element 对应一组数据， 由于数据分割，有可能一个 element 会包含多个 shape
    const { lastElementsMap, elementsMap, elements, theme, container } = this;
    const elementId = this.getElementId(mappedArray[0]);
    const shapeCfg = this.getShapeCfg(mappedArray);

    let result = lastElementsMap[elementId];
    if (!result) {
      const shapeFactory = this.getShapeFactory();
      result = new Element({
        data: shapeCfg.data,
        model: shapeCfg,
        shapeType: shapeCfg.shape || shapeFactory.defaultShapeType,
        theme: _.get(theme, this.shapeType, {}),
        shapeFactory,
        container,
      });
    } else {
      // element 已经创建
      const preShapeCfg = result.model;
      if (!_.isEqual(preShapeCfg, shapeCfg)) {
        // 通过绘制数据的变更来判断是否需要更新，因为用户有可能会修改图形属性映射
        result.update(shapeCfg); // 更新对应的 element
      }
      delete lastElementsMap[elementId];
    }

    elements.push(result);
    elementsMap[elementId] = result;

    return elements;
  }

  private getShapeCfg(mappedArray: Data) {
    const connectNulls = this.connectNulls;
    const yScale = this.getYScale();
    const splitArray = splitData(mappedArray, yScale.field, connectNulls);

    const shapeCfg = this.getDrawCfg(mappedArray[0]);
    shapeCfg.origin = mappedArray;
    shapeCfg.isStack = !!this.getAdjust('adjust');
    shapeCfg.points = splitArray;
    shapeCfg.data = this.getData(mappedArray);

    return shapeCfg;
  }

  private getData(mappedArray: Data): Data {
    return mappedArray.map((obj: Datum) => {
      return obj[FIELD_ORIGIN];
    });
  }
}
