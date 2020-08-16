/**
 * @file utils of label
 */
import { IGroup } from '@antv/g-base';
import { isNil, isNumber } from '@antv/util';
import { rotate, getRotateMatrix } from '../../../util/transform';
import { LabelItem } from '../interface';

/**
 * 获取标签背景 shape attrs
 */
export function getlLabelBackgroundShapeAttrs(
  labelGroup: IGroup,
  labelItem: LabelItem,
  padding: number | number[] = [0, 0, 0, 0]
): { box: { x: number; y: number; width: number; height: number }; matrix?: number[] } {
  const content = labelGroup.getChildren()[0];
  if (content) {
    const labelShape = content.clone();
    // revert rotate
    if (labelItem.rotate) {
      rotate(labelShape as IGroup, -labelItem.rotate);
    }

    // use `getCanvasBBox`, because if Shape is been translated, `getBBox` is not the actual box position
    const { x, y, width, height } = labelShape.getCanvasBBox();

    let matrix;
    if (labelItem.rotate) {
      // 获取 旋转矩阵
      matrix = getRotateMatrix(labelShape, labelItem.rotate);
    }

    labelShape.destroy();

    let boxPadding = padding;
    if (isNil(boxPadding)) {
      boxPadding = [2, 2, 2, 2];
    } else if (isNumber(boxPadding)) {
      boxPadding = new Array(4).fill(boxPadding);
    }

    return {
      box: {
        x: x - boxPadding[3],
        y: y - boxPadding[0],
        width: width + boxPadding[1] + boxPadding[3],
        height: height + boxPadding[0] + boxPadding[2],
      },
      matrix,
    };
  }
}
