import { each, get, isArray, map, isNumber, isString } from '@antv/util';
import { MappingDatum, Point } from '../../interface';
import { getDistanceToCenter } from '../../util/coordinate';
import { getAngleByPoint } from '../../util/coordinate';
import GeometryLabel from './base';
import { LabelCfg, LabelItem, PolarLabelItem, LabelPointCfg, Writeable } from './interface';

const HALF_PI = Math.PI / 2;

/**
 * 极坐标下的图形 label
 */
export default class PolarLabel extends GeometryLabel {
  /**
   * @override
   * @desc 获取 label offset
   * polar & theta coordinate support「string」type, should transform to 「number」
   */
  protected getLabelOffset(offset: number | string): number {
    const coordinate = this.getCoordinate();
    let actualOffset = 0;
    if (isNumber(offset)) {
      actualOffset = offset;
    } else if (isString(offset) && offset.indexOf('%') !== -1) {
      let r = coordinate.getRadius();
      if (coordinate.innerRadius > 0) {
        r = r * (1 - coordinate.innerRadius);
      }
      actualOffset = parseFloat(offset) * 0.01 * r;
    }

    return actualOffset;
  }

  /**
   * @override
   * 获取 labelItems, 增加切片 percent
   * @param mapppingArray
   */
  public getLabelItems(mapppingArray: MappingDatum[]): PolarLabelItem[] {
    const items = super.getLabelItems(mapppingArray);
    const yScale = this.geometry.getYScale();

    return map(items, (item) => {
      if (item && yScale) {
        const percent = yScale.scale(get(item.data, yScale.field));
        return { ...item, percent };
      }
      return item;
    });
  }
  /**
   * @override
   * 获取文本的对齐方式
   * @param point
   */
  protected getLabelAlign(point: LabelItem) {
    const coordinate = this.getCoordinate();
    let align;
    if (point.labelEmit) {
      align = point.angle <= Math.PI / 2 && point.angle >= -Math.PI / 2 ? 'left' : 'right';
    } else if (!coordinate.isTransposed) {
      align = 'center';
    } else {
      const center = coordinate.getCenter();
      const offset = point.offset;
      if (Math.abs(point.x - center.x) < 1) {
        align = 'center';
      } else if (point.angle > Math.PI || point.angle <= 0) {
        align = offset > 0 ? 'left' : 'right';
      } else {
        align = offset > 0 ? 'right' : 'left';
      }
    }
    return align;
  }

  /**
   * @override
   * 获取 label 的位置
   * @param labelCfg
   * @param mappingData
   * @param index
   */
  protected getLabelPoint(labelCfg: LabelCfg, mappingData: MappingDatum, index: number): LabelPointCfg {
    let factor = 1;
    let arcPoint;
    const content = labelCfg.content[index];
    if (this.isToMiddle(mappingData)) {
      arcPoint = this.getMiddlePoint(mappingData.points as Point[]);
    } else {
      if (labelCfg.content.length === 1 && index === 0) {
        index = 1;
      } else if (index === 0) {
        factor = -1;
      }
      arcPoint = this.getArcPoint(mappingData, index);
    }

    const offset = labelCfg.offset * factor;
    const middleAngle = this.getPointAngle(arcPoint);
    const isLabelEmit = labelCfg.labelEmit;
    const labelPositionCfg: Writeable<LabelPointCfg> = this.getCirclePoint(middleAngle, offset, arcPoint, isLabelEmit);
    if (labelPositionCfg.r === 0) {
      // 如果文本位置位于圆心，则不展示
      labelPositionCfg.content = '';
    } else {
      labelPositionCfg.content = content;
      labelPositionCfg.angle = middleAngle;
      labelPositionCfg.color = mappingData.color;
    }

    labelPositionCfg.rotate = labelCfg.autoRotate
      ? this.getLabelRotate(middleAngle, offset, isLabelEmit)
      : labelCfg.rotate;
    labelPositionCfg.start = {
      x: arcPoint.x,
      y: arcPoint.y,
    };
    return labelPositionCfg;
  }

  /**
   * 获取圆弧的位置
   */
  protected getArcPoint(mappingData: MappingDatum, index: number = 0): Point {
    if (!isArray(mappingData.x) && !isArray(mappingData.y)) {
      return {
        x: mappingData.x,
        y: mappingData.y,
      };
    }

    return {
      x: isArray(mappingData.x) ? mappingData.x[index] : mappingData.x,
      y: isArray(mappingData.y) ? mappingData.y[index] : mappingData.y,
    };
  }

  /**
   * 计算坐标线点在极坐标系下角度
   * @param point
   */
  protected getPointAngle(point: Point): number {
    return getAngleByPoint(this.getCoordinate(), point);
  }

  /**
   * 获取坐标点与圆心形成的圆的位置信息
   * @param angle
   * @param offset
   * @param point
   * @param isLabelEmit
   */
  protected getCirclePoint(angle: number, offset: number, point: Point, isLabelEmit: boolean) {
    const coordinate = this.getCoordinate();
    const center = coordinate.getCenter();
    let r = getDistanceToCenter(coordinate, point);
    if (r === 0) {
      return {
        ...center,
        r,
      };
    }

    let labelAngle = angle;
    if (coordinate.isTransposed && r > offset && !isLabelEmit) {
      const appendAngle = Math.asin(offset / (2 * r));
      labelAngle = angle + appendAngle * 2;
    } else {
      r = r + offset;
    }

    return {
      x: center.x + r * Math.cos(labelAngle),
      y: center.y + r * Math.sin(labelAngle),
      r,
    };
  }

  /**
   * 获取 label 的旋转角度
   * @param angle
   * @param offset
   * @param isLabelEmit
   */
  protected getLabelRotate(angle: number, offset: number, isLabelEmit: boolean) {
    let rotate = angle + HALF_PI;
    if (isLabelEmit) {
      rotate -= HALF_PI;
    }
    if (rotate) {
      if (rotate > HALF_PI) {
        rotate = rotate - Math.PI;
      } else if (rotate < -HALF_PI) {
        rotate = rotate + Math.PI;
      }
    }
    return rotate;
  }

  // 获取中心的位置
  private getMiddlePoint(points: Point[]) {
    const coordinate = this.getCoordinate();
    const count = points.length;
    let middlePoint = {
      x: 0,
      y: 0,
    };
    each(points, (point: Point) => {
      middlePoint.x += point.x;
      middlePoint.y += point.y;
    });
    middlePoint.x /= count;
    middlePoint.y /= count;

    middlePoint = coordinate.convert(middlePoint);
    return middlePoint;
  }

  // 是否居中
  private isToMiddle(mappingData: MappingDatum) {
    return (mappingData.x as number[]).length > 2;
  }
}
