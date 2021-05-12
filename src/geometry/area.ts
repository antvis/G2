import { FIELD_ORIGIN } from '../constant';
import { MappingDatum } from '../interface';
import Path, { PathCfg } from './path';
import './shape/area';

/** Area 几何标记构造函数参数 */
export interface AreaCfg extends PathCfg {
  /**
   * 面积图是否从 0 基准线开始填充。
   * 1. 默认值为 `true`，表现如下：
   * ![image](https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png)
   * 2. 当值为 `false` 时，表现如下：
   * ![image](https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png)
   */
  startOnZero?: boolean;
}

/**
 * Area 几何标记类。
 * 常用于绘制面积图。
 */
export default class Area extends Path {
  public readonly type: string = 'area';
  public readonly shapeType: string = 'area';
  /** 生成图形关键点 */
  public readonly generatePoints: boolean = true;
  /**
   * 面积图是否从 0 基准线开始填充。
   * 1. 默认值为 `true`，表现如下：
   * ![image](https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png)
   * 2. 当值为 `false` 时，表现如下：
   * ![image](https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png)
   */
  public readonly startOnZero: boolean = true;

  constructor(cfg: AreaCfg) {
    super(cfg);

    const { startOnZero = true, sortable = false, showSinglePoint = false } = cfg;
    this.startOnZero = startOnZero; // 默认为 true
    this.sortable = sortable; // 关闭默认的 X 轴数据排序
    this.showSinglePoint = showSinglePoint;
  }

  /**
   * 获取图形绘制的关键点以及数据
   * @param mappingData 映射后的数据
   */
  protected getPointsAndData(mappingData: MappingDatum[]) {
    const points = [];
    const data = [];

    for (let i = 0, len = mappingData.length; i < len; i++) {
      const obj = mappingData[i];
      points.push(obj.points);
      data.push(obj[FIELD_ORIGIN]);
    }

    return {
      points,
      data,
    };
  }

  /**
   * 获取 Y 轴上的最小值
   * @returns y 字段最小值
   */
  protected getYMinValue(): number {
    if (this.startOnZero) {
      return super.getYMinValue();
    }
    const yScale = this.getYScale();
    return yScale.min;
  }
}
