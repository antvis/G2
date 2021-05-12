import { get } from '@antv/util';
import { Datum, MappingDatum, ShapeInfo, LooseObject } from '../interface';
import { ShapeAttrs } from '../dependents';
import { getXDimensionLength } from '../util/coordinate';
import Geometry, { GeometryCfg } from './base';
/** 引入对应的 ShapeFactory */
import './shape/interval';
import { getDefaultSize } from './util/shape-size';
import { getMaxScale } from '../util/scale';

/** Path 构造函数参数类型 */
export interface IntervalCfg extends GeometryCfg {
  /** shape 背景，只对 Interval Geometry 生效，目前只对 interval-rect shape 生效。 */
  background?: { style?: ShapeAttrs };
}

/**
 * Interval 几何标记。
 * 用于绘制柱状图、饼图、条形图、玫瑰图等。
 */
export default class Interval extends Geometry {
  public readonly type: string = 'interval';
  public readonly shapeType: string = 'interval';
  /** shape 背景。目前只对 interval-rect shape 生效。 */
  protected background?: { style?: ShapeAttrs };
  protected generatePoints: boolean = true;

  constructor(cfg: IntervalCfg) {
    super(cfg);

    const { background } = cfg;
    this.background = background;
  }

  /**
   * 获取每条数据的 Shape 绘制信息
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(obj: Datum) {
    const cfg = super.createShapePointsCfg(obj);

    // 计算每个 shape 的 size
    let size;
    const sizeAttr = this.getAttribute('size');
    if (sizeAttr) {
      size = this.getAttributeValues(sizeAttr, obj)[0];
      // 归一化
      const coordinate = this.coordinate;
      const coordinateWidth = getXDimensionLength(coordinate);
      size = size / coordinateWidth;
    } else {
      if (!this.defaultSize) {
        this.defaultSize = getDefaultSize(this);
      }
      size = this.defaultSize;
    }
    cfg.size = size;

    return cfg;
  }

  /**
   * 调整 y 轴的 scale 范围。
   * 对于 Y 轴为数值轴柱状图，默认从 0 开始 生长。
   */
  protected adjustScale() {
    super.adjustScale();
    const yScale = this.getYScale();
    // 特殊逻辑：饼图需要填充满整个空间
    if (this.coordinate.type === 'theta') {
      yScale.change({
        nice: false,
        min: 0,
        // 发生过 stack 调整，yScale 的 max 被调整过，this.updateStackRange()
        max: getMaxScale(yScale),
      });
    } else {
      // 柱状图数值轴默认从 0 开始
      const scaleDefs = this.scaleDefs;
      const { field, min, max, type } = yScale;
      if (type !== 'time') {
        // time 类型不做调整
        // 柱状图的 Y 轴要从 0 开始生长，但是如果用户设置了则以用户的为准
        if (min > 0 && !get(scaleDefs, [field, 'min'])) {
          yScale.change({
            min: 0,
          });
        }
        // 柱当柱状图全为负值时也需要从 0 开始生长，但是如果用户设置了则以用户的为准
        if (max <= 0 && !get(scaleDefs, [field, 'max'])) {
          yScale.change({
            max: 0,
          });
        }
      }
    }
  }

  /**
   * @override
   */
  protected getDrawCfg(mappingData: MappingDatum): ShapeInfo {
    const shapeCfg = super.getDrawCfg(mappingData);
    shapeCfg.background = this.background;

    return shapeCfg;
  }
}
