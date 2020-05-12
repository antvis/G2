import { ext } from '@antv/matrix-util';
import { each } from '@antv/util';
import { IGroup, IShape } from '../../dependents';
import { GAnimateCfg } from '../../interface';
import { AnimateExtraCfg } from '../interface';

function doShapeZoom(shape: IShape | IGroup, animateCfg: GAnimateCfg, type: 'zoomIn' | 'zoomOut') {
  if (shape.isGroup()) {
    each((shape as IGroup).getChildren(), (child) => {
      doShapeZoom(child, animateCfg, type);
    });
  } else {
    const bbox = shape.getBBox();
    const x = (bbox.minX + bbox.maxX) / 2;
    const y = (bbox.minY + bbox.maxY) / 2;
    shape.applyToMatrix([x, y, 1]);

    if (type === 'zoomIn') {
      // 放大
      const matrix = ext.transform(shape.getMatrix(), [
        ['t', -x, -y],
        ['s', 0.01, 0.01],
        ['t', x, y],
      ]);
      shape.setMatrix(matrix);
      shape.animate(
        {
          matrix: ext.transform(shape.getMatrix(), [
            ['t', -x, -y],
            ['s', 100, 100],
            ['t', x, y],
          ]),
        },
        animateCfg
      );
    } else {
      shape.animate(
        {
          matrix: ext.transform(shape.getMatrix(), [
            ['t', -x, -y],
            ['s', 0.01, 0.01],
            ['t', x, y],
          ]),
        },
        {
          ...animateCfg,
          callback: () => {
            shape.remove(true);
          },
        }
      );
    }
  }
}

/**
 * @ignore
 * 单个 shape 动画
 * shape 以自身中心点逐渐放大的进入动画
 * @param shape 参与动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function zoomIn(shape: IShape | IGroup, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  doShapeZoom(shape, animateCfg, 'zoomIn');
}

/**
 * @ignore
 * 单个 shape 动画
 * 消失动画，shape 以自身为中心点的逐渐缩小
 * @param shape 参与动画的图形元素
 * @param animateCfg 动画配置
 * @param cfg 额外信息
 */
export function zoomOut(shape: IShape | IGroup, animateCfg: GAnimateCfg, cfg: AnimateExtraCfg) {
  doShapeZoom(shape, animateCfg, 'zoomOut');
}
