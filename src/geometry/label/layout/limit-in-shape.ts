import { each } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { LabelItem } from '../interface';

/**
 * @ignore
 * 根据图形元素以及 label 的 bbox 进行调整，如果 label 超出了 shape 的 bbox 则不展示
 */
export function limitInShape(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  each(labels, (label, index) => {
    const labelBBox = label.getCanvasBBox(); // 文本有可能发生旋转
    const shapeBBox = shapes[index].getBBox();
    if (
      labelBBox.minX < shapeBBox.minX ||
      labelBBox.minY < shapeBBox.minY ||
      labelBBox.maxX > shapeBBox.maxX ||
      labelBBox.maxY > shapeBBox.maxY
    ) {
      label.remove(true); // 超出则不展示
    }
  });
}
