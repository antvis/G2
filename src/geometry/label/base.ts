import { deepMix, each, get, isArray, isFunction, isNil, isNumber, isUndefined } from '@antv/util';
import { FIELD_ORIGIN } from '../../constant';
import { Coordinate, Scale } from '../../dependents';
import { Datum, LooseObject, MappingDatum, Point } from '../../interface';
import { getPolygonCentroid } from '../../util/graphics';
import Geometry from '../base';
import { LabelOption } from '../interface';
import { LabelCfg, LabelItem, LabelPointCfg } from './interface';

export type GeometryLabelsConstructor = new (cfg: any) => GeometryLabels;

function avg(arr: number[]) {
  let sum = 0;
  each(arr, (value: number) => {
    sum += value;
  });
  return sum / arr.length;
}

export default class GeometryLabels {
  public readonly geometry: Geometry;

  protected coordinate: Coordinate;
  // 默认的 label 配置
  protected defaultLabelCfg: LooseObject;

  constructor(geometry: Geometry) {
    this.geometry = geometry;

    this.coordinate = geometry.coordinate;
    this.defaultLabelCfg = get(geometry.theme, 'labels', {}); // 默认样式
  }

  public getLabelItems(mapppingArray: MappingDatum[]) {
    const items = this.adjustItems(this.getItems(mapppingArray));
    this.drawLines(items);

    return items;
  }

  protected setLabelPosition(
    labelPointCfg: LabelPointCfg,
    mappingData: MappingDatum,
    index: number,
    position: string
  ) {}

  protected lineToLabel(item: LabelItem) {}

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

  protected getDefaultOffset(offset: number) {
    const coordinate = this.coordinate;
    const vector = this.getOffsetVector(offset);
    return coordinate.isTransposed ? vector[0] : vector[1];
  }

  protected getLabelOffset(labelCfg: LabelCfg, index: number, total: number) {
    const offset = this.getDefaultOffset(labelCfg.offset);
    const coordinate = this.coordinate;
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

  protected getLabelPoint(labelCfg: LabelCfg, mappingData: MappingDatum, index: number): LabelPointCfg {
    const coordinate = this.coordinate;
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
    if (mappingData && mappingData.nextPoints && ['funnel', 'pyramid'].includes(mappingData.shape)) {
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
      this.setLabelPosition(label, mappingData, index, labelCfg.position);
    }
    const offsetPoint = this.getLabelOffset(labelCfg, index, total);
    label.start = { x: label.x, y: label.y };
    label.x += offsetPoint.x;
    label.y += offsetPoint.y;
    label.color = mappingData.color;
    return label;
  }

  protected getLabelAlign(item: LabelItem, index: number, total: number) {
    let align = 'center';
    const coordinate = this.coordinate;
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
    const defaultLabelCfg = this.defaultLabelCfg;
    const { type, theme, labelOption, scales } = geometry;
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
        ...cfg,
        ...callbackCfg,
        id: geometry.getElementId(origin), // 进行 ID 标记
        data: origin, // 存储原始数据
        mappingData, // 存储映射后的数据
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
    const coordinate = this.coordinate;
    // 如果 x,y 翻转，则偏移 x，否则偏移 y
    return coordinate.isTransposed ? coordinate.applyMatrix(offset, 0) : coordinate.applyMatrix(0, offset);
  }
}
