import { get } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { isIntersect } from '../../../util/collision-detect';
import { LabelItem } from '../interface';
import { getlLabelBackgroundInfo } from '../util';

/**
 * label 防遮挡布局：在不改变 label 位置的情况下对相互重叠的 label 进行隐藏（非移除）
 * 不同于 'overlap' 类型的布局，该布局不会对 label 的位置进行偏移调整。
 * @param labels 参与布局调整的 label 数组集合
 */
export function hideOverlap(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  // todo 添加 labelrank
  // each label will hide the next one because the next one always has lower rank.

  // Detect overlapping labels
  for (let i = 0; i < labels.length; i++) {
    const label1 = labels[i];
    if (labels[i].get('visible')) {
      for (let j = i + 1; j < labels.length; j++) {
        const label2 = labels[j];
        if (label1 && label2 && label1 !== label2 && label2.get('visible')) {
          const box1 = getlLabelBackgroundInfo(label1, items[i], get(items[i], 'background.padding'));
          const box2 = getlLabelBackgroundInfo(label2, items[j], get(items[j], 'background.padding'));

          if (isIntersect(box1, box2)) {
            labels[j].set('visible', false);
          }
        }
      }
    }
  }
}
