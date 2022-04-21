import { groupBy, keys, map } from '@antv/util';
import { IGroup, IShape, BBox } from '../../../../dependents';
import Geometry from '../../../base';
import Element from '../../../element';
import { LabelItem } from '../../interface';
import { findLabelTextShape } from '../../util';

/**
 * point-adjust-position layout 的配置类型
 */
export interface PointAdjustPositionLayoutCfg {
  offset?: number;
}

/**
 * 对同一组(相同 xField )的 Label 进行排序：第一个、最后一个、其他...
 * @param geometry
 * @param labels
 */
function sortLabels(geometry: Geometry, labels: IGroup[]) {
  const yField = geometry.getXYFields()[1];
  const result: IGroup[] = [];
  const sortedLabels = labels.sort((left, right) => left.get('data')[yField] - left.get('data')[yField]);

  if (sortedLabels.length > 0) {
    result.push(sortedLabels.shift());
  }
  if (sortedLabels.length > 0) {
    result.push(sortedLabels.pop());
  }
  result.push(...sortedLabels);

  return result;
}

function hasSome(dones: IGroup[], current: IGroup, compare: (left: IGroup, right: IGroup) => boolean): boolean {
  return dones.some((done) => compare(done, current));
}

/**
 * 计算两个矩形之间的堆叠区域面积
 */
function getOverlapArea(a: BBox, b: BBox, margin = 0) {
  const xOverlap = Math.max(
    0,
    Math.min(a.x + a.width + margin, b.x + b.width + margin) - Math.max(a.x - margin, b.x - margin)
  );
  const yOverlap = Math.max(
    0,
    Math.min(a.y + a.height + margin, b.y + b.height + margin) - Math.max(a.y - margin, b.y - margin)
  );

  return xOverlap * yOverlap;
}

/**
 * 判断新添加的 Label 是否和已存在的发生重叠
 * @param dones
 * @param current
 */
function checkShapeOverlap(dones: IGroup[], current: IGroup): boolean {
  return hasSome(dones, current, (left, right) => {
    const leftText = findLabelTextShape(left);
    const rightText = findLabelTextShape(right);

    return getOverlapArea(leftText.getCanvasBBox(), rightText.getCanvasBBox(), 2) > 0;
  });
}
/**
 * 适用于 point geometry 的数据标签位置自动调整布局方法
 * @param items
 * @param labels
 * @param shapes
 * @param region
 * @param cfg
 */
export function pathAdjustPosition(
  items: LabelItem[],
  labels: IGroup[],
  shapes: IShape[] | IGroup[],
  region: BBox,
  cfg: PointAdjustPositionLayoutCfg
): void {
  if (shapes.length === 0) {
    return;
  }

  const element: Element = shapes[0]?.get('element');
  const geometry: Geometry = element?.geometry;
  if (!geometry || ['path', 'line', 'area'].indexOf(geometry.type) < 0) {
    return;
  }
  const [xField, yField] = geometry.getXYFields();
  const groupedLabels = groupBy(labels, (label) => label.get('data')[xField]);
  const dones: IGroup[] = [];
  const offset = (cfg && cfg.offset) || items[0]?.offset || 12;

  map(keys(groupedLabels).reverse(), (xValue) => {
    const sortedCollections = sortLabels(geometry, groupedLabels[xValue]);
    while (sortedCollections.length) {
      const current = sortedCollections.shift();
      const textShape = findLabelTextShape(current);
      if (
        hasSome(
          dones,
          current,
          (left, right) =>
            left.get('data')[xField] === right.get('data')[xField] &&
            left.get('data')[yField] === right.get('data')[yField]
        )
      ) {
        // 重复位置，直接隐藏
        textShape.set('visible', false);
        continue;
      }
      const upFail = checkShapeOverlap(dones, current);
      let downFail: boolean = false;
      if (upFail) {
        textShape.attr('y', textShape.attr('y') + 2 * offset);
        downFail = checkShapeOverlap(dones, current);
      }
      if (downFail) {
        textShape.set('visible', false);
        continue;
      }
      dones.push(current);
    }
  });
}
