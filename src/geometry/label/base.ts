import { deepMix, each, get, isArray, isFunction, isNil, isNumber, isUndefined } from '@antv/util';

import { FIELD_ORIGIN } from '../../constant';
import { Coordinate, Scale } from '../../dependents';
import { Datum, LabelOption, LooseObject, MappingDatum, Point } from '../../interface';
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

  constructor(geometry: Geometry) {
    this.geometry = geometry;
  }

  public render(mapppingArray: MappingDatum[], isUpdate: boolean) {
    let labelItems = this.getItems(mapppingArray);
    labelItems = this.adjustItems(labelItems);

    this.drawLines(labelItems);

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
   * 根据当前 shape 对应的映射数据获取对应的 label 配置信息。
   * @param mapppingArray 映射后的绘制数据
   * @returns
   */
  public getLabelItems(mapppingArray: MappingDatum[]) {
    const items = this.adjustItems(this.getItems(mapppingArray));
    this.drawLines(items);

    return items;
  }

  /**
   * 获取 label 的默认配置
   */
  protected getDefaultLabelCfg() {
    return get(this.geometry.theme, 'labels', {});
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
   * 生成文本线配置
   * @param item
   */
  protected lineToLabel(item: LabelItem) {}

  /**
   * 根据用户设置的 offsetX 和 offsetY 调整 label 的 x 和 y 坐标
   * @param items
   * @returns
   */
  protected adjustItems(items: LabelItem[]) {
    each(items, (item) => {
      if (!item) {
        return;
      }
      if (item.offsetX) {
        item.x += item.offsetX;
      }
      if (item.offsetY) {
        item.y += item.offsetY;
      }
    });
    return items;
  }

  /**
   * 绘制 label 文本连接线
   * @param items
   */
  protected drawLines(items: LabelItem[]) {
    each(items, (item) => {
      if (!item) {
        return;
      }

      if (item.offset <= 0) {
        // 内部文本不绘制 labelLine
        item.labelLine = null;
      }

      if (item.labelLine) {
        this.lineToLabel(item);
      }
    });
  }

  /**
   * 获取文本默认偏移量
   * @param offset
   * @returns
   */
  protected getDefaultOffset(offset: number) {
    const coordinate = this.getCoordinate();
    const vector = this.getOffsetVector(offset);
    return coordinate.isTransposed ? vector[0] : vector[1];
  }

  /**
   * 获取每个 label 的偏移量
   * @param labelCfg
   * @param index
   * @param total
   * @returns
   */
  protected getLabelOffset(labelCfg: LabelCfg, index: number, total: number) {
    const offset = this.getDefaultOffset(labelCfg.offset);
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

    function getDimValue(value, idx) {
      let v = value;
      if (isArray(v)) {
        if (labelCfg.content.length === 1) {
          // 如果仅一个 label，多个 y, 取最后一个 y
          if (v.length <= 2) {
            v = v[value.length - 1];
          } else {
            v = avg(v);
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
    // 多边形场景，多用于地图
    if (mappingData && this.geometry.type === 'polygon') {
      const centroid = getPolygonCentroid(mappingData.x, mappingData.y);
      label.x = centroid[0];
      label.y = centroid[1];
    } else {
      label.x = getDimValue(mappingData.x, index);
      label.y = getDimValue(mappingData.y, index);
    }

    // get nearest point of the shape as the label line start point
    if (
      mappingData &&
      mappingData.nextPoints &&
      ['funnel', 'pyramid'].includes(isArray(mappingData.shape) ? mappingData.shape[0] : mappingData.shape)
    ) {
      let maxX = -Infinity;
      mappingData.nextPoints.forEach((p) => {
        const p1 = coordinate.convert(p);
        if (p1.x > maxX) {
          maxX = p1.x;
        }
      });
      label.x = (label.x + maxX) / 2;
    }
    // sharp edge of the pyramid
    if (mappingData.shape === 'pyramid' && !mappingData.nextPoints && mappingData.points) {
      (mappingData.points as Point[]).forEach((p: Point) => {
        let p1 = p;
        p1 = coordinate.convert(p1);
        if (
          (isArray(p1.x) && (mappingData.x as number[]).indexOf(p1.x) === -1) ||
          (isNumber(p1.x) && mappingData.x !== p1.x)
        ) {
          label.x = (label.x + p1.x) / 2;
        }
      });
    }

    if (labelCfg.position) {
      // 如果 label 支持 position 属性
      this.setLabelPosition(label, mappingData, index, labelCfg.position);
    }
    const offsetPoint = this.getLabelOffset(labelCfg, index, total);
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
      const offset = this.getDefaultOffset(item.offset);
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
        layout: get(labelOption, ['cfg', 'layout']),
      });
      this.labelsRenderer = labelsRenderer;
    }
    labelsRenderer.region = canvasRegion;
    // 设置动画配置，如果 geometry 的动画关闭了，那么 label 的动画也会关闭
    labelsRenderer.animate = animateOption ? getDefaultAnimateCfg('label', coordinate) : false;

    return labelsRenderer;
  }

  private getItems(mapppingArray: MappingDatum[]): LabelItem[] {
    const items = [];
    const labelCfgs = this.getLabelCfgs(mapppingArray);
    // 获取 label 相关的 x，y 的值，获取具体的 x, y，防止存在数组
    each(mapppingArray, (mappingData: MappingDatum, index: number) => {
      const labelCfg = labelCfgs[index];
      if (!labelCfg) {
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

        items.push(item);
      });
    });
    return items;
  }

  private getLabelCfgs(mapppingArray: MappingDatum[]): LabelCfg[] {
    const geometry = this.geometry;
    const defaultLabelCfg = this.getDefaultLabelCfg();
    const { type, theme, labelOption, scales, coordinate } = geometry;
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
        data: origin, // 存储原始数据
        mappingData, // 存储映射后的数据,
        coordinate, // 坐标系
        ...cfg,
        ...callbackCfg,
      };

      const content = labelCfg.content;
      if (isFunction(content)) {
        labelCfg.content = content(origin, mappingData, index);
      } else if (isUndefined(content)) {
        // 用户未配置 content，则默认为映射的第一个字段的值
        labelCfg.content = originText[0];
      }

      if (isFunction(labelCfg.position)) {
        labelCfg.position = labelCfg.position(origin, mappingData, index);
      }

      if (type === 'polygon' || (labelCfg.offset < 0 && !['line', 'point', 'path'].includes(type))) {
        // polygon 或者 offset 小于 0 时，文本展示在图形内部，将其颜色设置为 白色
        labelCfg = deepMix({}, defaultLabelCfg, theme.innerLabels, labelCfg);
      } else {
        labelCfg = deepMix({}, defaultLabelCfg, theme.labels, labelCfg);
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

  private getOffsetVector(offset = 0) {
    const coordinate = this.getCoordinate();
    // 如果 x,y 翻转，则偏移 x，否则偏移 y
    return coordinate.isTransposed ? coordinate.applyMatrix(offset, 0) : coordinate.applyMatrix(0, offset);
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
