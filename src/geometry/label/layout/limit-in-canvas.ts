import { each } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { translate } from '../../../util/transform';
import { LabelItem } from '../interface';

/**
 * @ignore
 * 将 label 限制在画布范围内，简单得将超出画布的 label 往画布内调整
 * @param labels
 * @param cfg
 */
export function limitInCanvas(items: LabelItem[], labels: IGroup[], shapes: IShape[] | IGroup[], region: BBox) {
  each(labels, (label: IGroup) => {
    const { minX: regionMinX, minY: regionMinY, maxX: regionMaxX, maxY: regionMaxY } = region;
    const { minX, minY, maxX, maxY, x, y, width, height } = label.getCanvasBBox();

    let finalX = x;
    let finalY = y;
    if (minX < regionMinX || maxX < regionMinX) {
      // 超出左侧
      finalX = regionMinX;
    }
    if (minY < regionMinY || maxY < regionMinY) {
      // 超出顶部
      finalY = regionMinY;
    }

    if (minX > regionMaxX) {
      // 整体超出右侧
      finalX = regionMaxX - width;
    } else if (maxX > regionMaxX) {
      // 超出右侧
      finalX = finalX - (maxX - regionMaxX);
    }

    if (minY > regionMaxY) {
      // 整体超出顶部
      finalY = regionMaxY - height;
    } else if (maxY > regionMaxY) {
      // 超出底部
      finalY = finalY - (maxY - regionMaxY);
    }

    if (finalX !== x || finalY !== y) {
      translate(label, finalX - x, finalY - y);
    }
  });
}
