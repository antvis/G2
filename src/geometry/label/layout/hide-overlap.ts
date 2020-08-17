import { get } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { isIntersect } from '../../../util/graphics';
import { LabelItem } from '../interface';
import { getlLabelBackgroundShapeAttrs } from '../util';

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
    if (labels[i].attr('opacity') !== 0) {
      for (let j = i + 1; j < labels.length; j++) {
        const label2 = labels[j];
        if (label1 && label2 && label1 !== label2 && label2.get('visible')) {
          const shapeAttrs1 = getlLabelBackgroundShapeAttrs(label1, items[i], get(items[i], 'background.padding'));
          const shapeAttrs2 = getlLabelBackgroundShapeAttrs(label2, items[j], get(items[j], 'background.padding'));

          const labelShape1 = label1.addShape('rect', {
            attrs: {
              ...shapeAttrs1.box,
              fill: 'transparent',
            },
          });
          if (shapeAttrs1.matrix) {
            labelShape1.setMatrix(shapeAttrs1.matrix);
          }
          const labelShape2 = label2.addShape('rect', {
            attrs: {
              ...shapeAttrs2.box,
              fill: 'transparent',
            },
          });
          if (shapeAttrs2.matrix) {
            labelShape2.setMatrix(shapeAttrs2.matrix);
          }

          if (labelShape1 && labelShape2 && isIntersect(labelShape1, labelShape2)) {
            labels[j].set('visible', false);
          }

          labelShape1.remove(true);
          labelShape2.remove(true);
        }
      }
    }
  }
}
