import { deepMix, each, get, isArray, isFunction, isNil, isNumber, isString, isUndefined } from '@antv/util';

import { FIELD_ORIGIN } from '../../constant';
import { Scale } from '../../dependents';
import { Datum, LabelOption, MappingDatum, Point } from '../../interface';
import { LabelCfg, LabelItem, LabelPointCfg, TextAlign } from './interface';

import { getDefaultAnimateCfg } from '../../animate';
import { getPolygonCentroid } from '../../util/graphics';

import Labels from '../../component/labels';
import Geometry from '../base';
import Element from '../element';

export type GeometryLabelConstructor = new (cfg: any) => GeometryLabel;

function avg(arr: number[]) {
  let sum = 0;
  each(arr, (value: number) => {
    sum += value;
  });
  return sum / arr.length;
}

/**
 * Geometry Label 基类，用于生成 Geometry 下所有 label 的配置项信息
 */
export default class GeometryLabel {
  /** geometry 实例 */
  public readonly geometry: Geometry;
  public labelsRenderer: Labels;
  /** 默认的布局 */
  public defaultLayout: string;

  constructor(geometry: Geometry) {
    this.geometry = geometry;
  }

  public getLabelItems(mapppingArray: MappingDatum[]): LabelItem[] {
    const items = [];
    const labelCfgs = this.getLabelCfgs(mapppingArray);
    // 获取 label 相关的 x，y 的值，获取具体的 x, y，防止存在数组
    each(mapppingArray, (mappingData: MappingDatum, index: number) => {
      const labelCfg = labelCfgs[index];
      if (!labelCfg || isNil(mappingData.x) || isNil(mappingData.y)) {
        items.push(null);
        return;
      }

      const labelContent = !isArray(labelCfg.content) ? [labelCfg.content] : labelCfg.content;
      labelCfg.content = labelContent;
      const total = labelContent.length;
      each(labelContent, (content, subIndex) => {
        if (isNil(content) || content === '') {
          items.push(null);
          return;
        }

        const item = {
          ...labelCfg,
          ...this.getLabelPoint(labelCfg, mappingData, subIndex),
        };
        if (!item.textAlign) {
          item.textAlign = this.getLabelAlign(item, subIndex, total);
        }

        if (item.offset <= 0) {
          item.labelLine = null;
        }

        items.push(item);
      });
    });
    return items;
  }

  public render(mapppingArray: MappingDatum[], isUpdate: boolean = false) {
    const labelItems = this.getLabelItems(mapppingArray);
    const labelsRenderer = this.getLabelsRenderer();
    const shapes = this.getGeometryShapes();
    // 渲染文本
    labelsRenderer.render(labelItems, shapes, isUpdate);
  }

  public clear() {
    const labelsRenderer = this.labelsRenderer;
    if (labelsRenderer) {
      labelsRenderer.clear();
    }
  }

  public destroy() {
    const labelsRenderer = this.labelsRenderer;
    if (labelsRenderer) {
      labelsRenderer.destroy();
    }
    this.labelsRenderer = null;
  }

  // geometry 更新之后，对应的 Coordinate 也会更新，为了获取到最新鲜的 Coordinate，故使用方法获取
  public getCoordinate() {
    return this.geometry.coordinate;
  }

  /**
   * 获取 label 的默认配置
   */
  protected getDefaultLabelCfg(offset?: number, position?: string) {
    const geometry = this.geometry;
    const { type, theme } = geometry;

    if (
      type === 'polygon' ||
      (type === 'interval' && position === 'middle') ||
      (offset < 0 && !['line', 'point', 'path'].includes(type))
    ) {
      // polygon 或者 (interval 且 middle) 或者 offset 小于 0 时，文本展示在图形内部，将其颜色设置为 白色
      return get(theme, 'innerLabels', {});
    }

    return get(theme, 'labels', {});
  }

  /**
   * 获取当前 label 的最终配置
   * @param labelCfg
   */
  protected getThemedLabelCfg(labelCfg: LabelCfg) {
    const geometry = this.geometry;
    const defaultLabelCfg = this.getDefaultLabelCfg();
    const { type, theme } = geometry;
    let themedLabelCfg;

    if (type === 'polygon' || (labelCfg.offset < 0 && !['line', 'point', 'path'].includes(type))) {
      // polygon 或者 offset 小于 0 时，文本展示在图形内部，将其颜色设置为 白色
      themedLabelCfg = deepMix({}, defaultLabelCfg, theme.innerLabels, labelCfg);
    } else {
      themedLabelCfg = deepMix({}, defaultLabelCfg, theme.labels, labelCfg);
    }

    return themedLabelCfg;
  }

  /**
   * 设置 label 位置
   * @param labelPointCfg
   * @param mappingData
   * @param index
   * @param position
   */
  protected setLabelPosition(
    labelPointCfg: LabelPointCfg,
    mappingData: MappingDatum,
    index: number,
    position: string
  ) {}

  /**
   * @desc 获取 label offset
   */
  protected getLabelOffset(offset: number | string): number {
    const coordinate = this.getCoordinate();
    const vector = this.getOffsetVector(offset);
    return coordinate.isTransposed ? vector[0] : vector[1];
  }

  /**
   * 获取每个 label 的偏移量 (矢量)
   * @param labelCfg
   * @param index
   * @param total
   * @return {Point} offsetPoint
   */
  protected getLabelOffsetPoint(labelCfg: LabelCfg, index: number, total: number): Point {
    const offset = labelCfg.offset;
    const coordinate = this.getCoordinate();
    const transposed = coordinate.isTransposed;
    const dim = transposed ? 'x' : 'y';
    const factor = transposed ? 1 : -1; // y 方向上越大，像素的坐标越小，所以transposed时将系数变成
    const offsetPoint = {
      x: 0,
      y: 0,
    };
    if (index > 0 || total === 1) {
      // 判断是否小于0
      offsetPoint[dim] = offset * factor;
    } else {
      offsetPoint[dim] = offset * factor * -1;
    }
    return offsetPoint;
  }

  /**
   * 获取每个 label 的位置
   * @param labelCfg
   * @param mappingData
   * @param index
   * @returns label point
   */
  protected getLabelPoint(labelCfg: LabelCfg, mappingData: MappingDatum, index: number): LabelPointCfg {
    const coordinate = this.getCoordinate();
    const total = labelCfg.content.length;

    function getDimValue(value: number | number[], idx: number, isAvg = false) {
      let v = value;
      if (isArray(v)) {
        if (labelCfg.content.length === 1) {
          if (isAvg) {
            v = avg(v);
          } else {
            // 如果仅一个 label，多个 y, 取最后一个 y
            if (v.length <= 2) {
              v = v[(value as number[]).length - 1];
            } else {
              v = avg(v);
            }
          }
        } else {
          v = v[idx];
        }
      }
      return v;
    }

    const label = {
      content: labelCfg.content[index],
      x: 0,
      y: 0,
      start: { x: 0, y: 0 },
      color: '#fff',
    };
    const shape = isArray(mappingData.shape) ? mappingData.shape[0] : mappingData.shape;
    const isFunnel = shape === 'funnel' || shape === 'pyramid';

    // 多边形场景，多用于地图
    if (this.geometry.type === 'polygon') {
      const centroid = getPolygonCentroid(mappingData.x, mappingData.y);
      label.x = centroid[0];
      label.y = centroid[1];
    } else if (this.geometry.type === 'interval' && !isFunnel) {
      // 对直方图的label X 方向的位置居中
      label.x = getDimValue(mappingData.x, index, true);
      label.y = getDimValue(mappingData.y, index);
    } else {
      label.x = getDimValue(mappingData.x, index);
      label.y = getDimValue(mappingData.y, index);
    }

    // 处理漏斗图文本位置
    if (isFunnel) {
      const nextPoints = get(mappingData, 'nextPoints');
      const points = get(mappingData, 'points');
      if (nextPoints) {
        // 非漏斗图底部
        const point1 = coordinate.convert(points[1] as Point);
        const point2 = coordinate.convert(nextPoints[1] as Point);
        label.x = (point1.x + point2.x) / 2;
        label.y = (point1.y + point2.y) / 2;
      } else if (shape === 'pyramid') {
        const point1 = coordinate.convert(points[1] as Point);
        const point2 = coordinate.convert(points[2] as Point);
        label.x = (point1.x + point2.x) / 2;
        label.y = (point1.y + point2.y) / 2;
      }
    }

    if (labelCfg.position) {
      // 如果 label 支持 position 属性
      this.setLabelPosition(label, mappingData, index, labelCfg.position);
    }
    const offsetPoint = this.getLabelOffsetPoint(labelCfg, index, total);
    label.start = { x: label.x, y: label.y };
    label.x += offsetPoint.x;
    label.y += offsetPoint.y;
    label.color = mappingData.color;
    return label;
  }

  /**
   * 获取文本的对齐方式
   * @param item
   * @param index
   * @param total
   * @returns
   */
  protected getLabelAlign(item: LabelItem, index: number, total: number): TextAlign {
    let align: TextAlign = 'center';
    const coordinate = this.getCoordinate();
    if (coordinate.isTransposed) {
      const offset = item.offset;
      if (offset < 0) {
        align = 'right';
      } else if (offset === 0) {
        align = 'center';
      } else {
        align = 'left';
      }
      if (total > 1 && index === 0) {
        if (align === 'right') {
          align = 'left';
        } else if (align === 'left') {
          align = 'right';
        }
      }
    }
    return align;
  }

  /**
   * 获取每一个 label 的唯一 id
   * @param mappingData label 对应的图形的绘制数据
   */
  protected getLabelId(mappingData: MappingDatum) {
    const geometry = this.geometry;
    const type = geometry.type;
    const xScale = geometry.getXScale();
    const yScale = geometry.getYScale();
    const origin = mappingData[FIELD_ORIGIN]; // 原始数据

    let labelId = geometry.getElementId(mappingData);
    if (type === 'line' || type === 'area') {
      // 折线图以及区域图，一条线会对应一组数据，即多个 labels，为了区分这些 labels，需要在 line id 的前提下加上 x 字段值
      labelId += ` ${origin[xScale.field]}`;
    } else if (type === 'path') {
      // path 路径图，无序，有可能存在相同 x 不同 y 的情况，需要通过 x y 来确定唯一 id
      labelId += ` ${origin[xScale.field]}-${origin[yScale.field]}`;
    }

    return labelId;
  }

  // 获取 labels 组件
  private getLabelsRenderer() {
    const { labelsContainer, labelOption, canvasRegion, animateOption } = this.geometry;
    const coordinate = this.geometry.coordinate;

    let labelsRenderer = this.labelsRenderer;
    if (!labelsRenderer) {
      labelsRenderer = new Labels({
        container: labelsContainer,
        layout: get(labelOption, ['cfg', 'layout'], {
          type: this.defaultLayout,
        }),
      });
      this.labelsRenderer = labelsRenderer;
    }
    labelsRenderer.region = canvasRegion;
    // 设置动画配置，如果 geometry 的动画关闭了，那么 label 的动画也会关闭
    labelsRenderer.animate = animateOption ? getDefaultAnimateCfg('label', coordinate) : false;

    return labelsRenderer;
  }

  private getLabelCfgs(mapppingArray: MappingDatum[]): LabelCfg[] {
    const geometry = this.geometry;
    const { labelOption, scales, coordinate } = geometry;
    const { fields, callback, cfg } = labelOption as LabelOption;
    const labelScales = fields.map((field: string) => {
      return scales[field];
    });

    const labelCfgs: LabelCfg[] = [];
    each(mapppingArray, (mappingData: MappingDatum, index: number) => {
      const origin = mappingData[FIELD_ORIGIN]; // 原始数据
      const originText = this.getLabelText(origin, labelScales);
      let callbackCfg;
      if (callback) {
        // 当同时配置了 callback 和 cfg 时，以 callback 为准
        const originValues = fields.map((field: string) => origin[field]);
        callbackCfg = callback(...originValues);
        if (isNil(callbackCfg)) {
          labelCfgs.push(null);
          return;
        }
      }

      let labelCfg = {
        id: this.getLabelId(mappingData), // 进行 ID 标记
        elementId: this.geometry.getElementId(mappingData), // label 对应 Element 的 ID
        data: origin, // 存储原始数据
        mappingData, // 存储映射后的数据,
        coordinate, // 坐标系
        ...cfg,
        ...callbackCfg,
      };

      if (isFunction(labelCfg.position)) {
        labelCfg.position = labelCfg.position(origin, mappingData, index);
      }

      const offset = this.getLabelOffset(labelCfg.offset || 0);
      // defaultCfg 需要判断 innerLabels & labels
      const defaultLabelCfg = this.getDefaultLabelCfg(offset, labelCfg.position);
      // labelCfg priority: defaultCfg < cfg < callbackCfg
      labelCfg = deepMix({}, defaultLabelCfg, labelCfg);
      // 获取最终的 offset
      labelCfg.offset = this.getLabelOffset(labelCfg.offset || 0);

      const content = labelCfg.content;
      if (isFunction(content)) {
        labelCfg.content = content(origin, mappingData, index);
      } else if (isUndefined(content)) {
        // 用户未配置 content，则默认为映射的第一个字段的值
        labelCfg.content = originText[0];
      }

      labelCfgs.push(labelCfg);
    });

    return labelCfgs;
  }

  private getLabelText(origin: Datum, scales: Scale[]) {
    const labelTexts = [];
    each(scales, (scale: Scale) => {
      let value = origin[scale.field];
      if (isArray(value)) {
        value = value.map((subVal) => {
          return scale.getText(subVal);
        });
      } else {
        value = scale.getText(value);
      }

      if (isNil(value) || value === '') {
        labelTexts.push(null);
      } else {
        labelTexts.push(value);
      }
    });
    return labelTexts;
  }

  private getOffsetVector(offset: number | string = 0) {
    const coordinate = this.getCoordinate();
    let actualOffset = 0;
    if (isNumber(offset)) {
      actualOffset = offset;
    }
    // 如果 x,y 翻转，则偏移 x，否则偏移 y
    return coordinate.isTransposed ? coordinate.applyMatrix(actualOffset, 0) : coordinate.applyMatrix(0, actualOffset);
  }

  private getGeometryShapes() {
    const geometry = this.geometry;
    const shapes = {};
    each(geometry.elementsMap, (element: Element, id: string) => {
      shapes[id] = element.shape;
    });
    // 因为有可能 shape 还在进行动画，导致 shape.getBBox() 获取到的值不是最终态，所以需要从 offscreenGroup 获取
    each(geometry.getOffscreenGroup().getChildren(), (child) => {
      const id = geometry.getElementId(child.get('origin').mappingData);
      shapes[id] = child;
    });

    return shapes;
  }
}
