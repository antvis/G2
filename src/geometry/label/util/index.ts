/**
 * @file utils of label
 */

import { isNil, isNumber, some } from '@antv/util';
import { IElement, IGroup, BBox } from '../../../dependents';
import { rotate } from '../../../util/transform';
import { LabelItem } from '../interface';

/**
 * 查找 Label Group 中的文本 shape 对象
 * @param label
 */
export function findLabelTextShape(label: IGroup): IElement {
  return label.find((el) => el.get('type') === 'text');
}

/**
 * 获取标签背景信息: box (无旋转) + rotation (旋转角度)
 */
export function getlLabelBackgroundInfo(
  labelGroup: IGroup,
  labelItem: LabelItem,
  padding: number | number[] = [0, 0, 0, 0]
): { x: number; y: number; width: number; height: number; rotation: number } {
  const content = labelGroup.getChildren()[0];
  if (content) {
    const labelShape = content.clone();

    // revert rotate
    if (labelItem?.rotate) {
      rotate(labelShape as IGroup, -labelItem.rotate);
    }

    // use `getCanvasBBox`, because if Shape is been translated, `getBBox` is not the actual box position
    const { x, y, width, height } = labelShape.getCanvasBBox();

    labelShape.destroy();

    let boxPadding = padding;
    if (isNil(boxPadding)) {
      boxPadding = [2, 2, 2, 2];
    } else if (isNumber(boxPadding)) {
      boxPadding = new Array(4).fill(boxPadding);
    }

    return {
      x: x - boxPadding[3],
      y: y - boxPadding[0],
      width: width + boxPadding[1] + boxPadding[3],
      height: height + boxPadding[0] + boxPadding[2],
      rotation: labelItem?.rotate || 0,
    };
  }
}

/**
 * 计算两个矩形之间的堆叠区域面积
 */
export function getOverlapArea(a: BBox, b: BBox, margin = 0) {
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

/** 检测是否和已布局的堆叠 */
export function checkShapeOverlap(cur: IElement, dones: IElement[]) {
  const box = cur.getBBox();
  return some(dones, (done) => {
    const target = done.getBBox();
    return getOverlapArea(box, target, 2) > 0;
  });
}
