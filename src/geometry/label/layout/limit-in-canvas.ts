import { each } from '@antv/util';
import { IGroup } from '../../../dependents';
import { translate } from '../../../util/transform';
import { GeometryLabelLayoutCfg } from '../interface';

/**
 * 将 label 限制在画布范围内，简单得将超出画布的 label 往画布内调整
 * @param labels
 * @param cfg
 */
export function limitInCanvas(labels: IGroup[], cfg: GeometryLabelLayoutCfg) {
  each(labels, (label: IGroup) => {
    const { start, end } = cfg.region;
    const { minX, minY, maxX, maxY, x, y, width, height } = label.getCanvasBBox();

    let finalX = x;
    let finalY = y;
    if (minX < start.x || maxX < start.x) {
      // 超出左侧
      finalX = start.x;
    }
    if (minY < start.y || maxY < start.y ) {
      // 超出顶部
      finalY = start.y;
    }

    if (minX > end.x) {
      // 整体超出右侧
      finalX = end.x - width;
    } else if (maxX > end.x) {
      // 超出右侧
      finalX = finalX - (maxX - end.x);
    }

    if (minY > end.y) {
      // 整体超出顶部
      finalY = end.y - height;
    } else if (maxY > end.y) {
      // 超出底部
      finalY = finalY - (maxY - end.y);
    }

    if (finalX !== x || finalY !== y) {
      translate(label, finalX - x, finalY - y);
    }
  });
}
