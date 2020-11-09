import { IElement, IGroup, IShape } from '../../../../dependents';
import { BBox } from '../../../../util/bbox';
import Geometry from '../../../base';
import Element from '../../../element';
import { LabelItem } from '../../interface';
import { findLabelTextShape } from '../../util';

function shouldInShapeSingle(geometry: Geometry, label: IGroup, shape: IElement): boolean {
  const coordinate = geometry.coordinate;
  const textShape = findLabelTextShape(label);
  const textBBox = BBox.fromObject(textShape.getCanvasBBox());
  const shapeBBox = BBox.fromObject(shape.getBBox());

  return coordinate.isTransposed ? shapeBBox.height >= textBBox.height : shapeBBox.width >= textBBox.width;
}

function shouldInShape(geometry: Geometry, labels: IGroup[], shapes: IShape[] | IGroup[]): boolean {
  const isStack = !!geometry.getAdjust('stack');

  return (
    isStack ||
    labels.every((label: IGroup, index: number) => {
      const shape = shapes[index];
      return shouldInShapeSingle(geometry, label, shape);
    })
  );
}

function moveInShape(geometry: Geometry, label: IGroup, shape: IElement): void {
  const coordinate = geometry.coordinate;
  const shapeBBox = BBox.fromObject(shape.getBBox());
  const textShape = findLabelTextShape(label);

  if (coordinate.isTransposed) {
    // 水平方向：条形图系列
    textShape.attr({
      x: shapeBBox.minX + shapeBBox.width / 2,
      textAlign: 'center',
    });
  } else {
    // 垂直方向：柱形图系列
    textShape.attr({
      y: shapeBBox.minY + shapeBBox.height / 2,
      textBaseline: 'middle',
    });
  }
}

/**
 * 适用于 interval geometry 的数据标签位置自动调整布局方法
 * @param items
 * @param labels
 * @param shapes
 */
export function intervalAdjustPosition(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[]) {
  if (shapes.length === 0) {
    return;
  }
  const element: Element = shapes[0]?.get('element');
  const geometry: Geometry = element?.geometry;
  if (!geometry || geometry.type !== 'interval') {
    return;
  }

  const inShape = shouldInShape(geometry, labels, shapes);
  if (inShape) {
    shapes.forEach((shape: IShape | IGroup, index: number) => {
      const label = labels[index];
      moveInShape(geometry, label, shape);
    });
  }
}
