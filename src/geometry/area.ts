import { Data, Datum } from '../interface';
import Path, { PathCfg } from './path';
import './shape/area';

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

    const { startOnZero = true, sortable = true } = cfg;
    this.startOnZero = startOnZero; // 默认为 true
    this.sortable = sortable; // Area 默认会对数据按照 x 轴字段进行正向排序
  }

  /**
   * get points for ShapeInfo
   * @override
   * @param mappedArray
   * @returns
   */
  protected getPoints(mappedArray: Data) {
    return mappedArray.map((obj: Datum) => {
      return obj.points;
    });
  }

  // 获取 Y 轴上的最小值
  protected getYMinValue(): number {
    if (this.startOnZero) {
      return super.getYMinValue();
    }
    const yScale = this.getYScale();
    return yScale.min;
  }
}
