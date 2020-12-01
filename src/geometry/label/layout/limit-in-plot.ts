import { each, pick } from '@antv/util';
import { BBox, IGroup, IShape } from '../../../dependents';
import { getCoordinateBBox } from '../../../util/coordinate';
import { getEllipsisText } from '../../..//util/text';
import { translate } from '../../../util/transform';
import { LabelItem } from '../interface';

/** limitInPlot layout 的可选配置 */
export interface LimitInPlotLayoutCfg {
  /** 需要限制哪些方向上不能超过 Plot 范围，默认四个方向上都限制 */
  direction?: ('top' | 'right' | 'bottom' | 'left')[];
  /** 可以允许的 margin */
  margin?: number;
  /** 超过限制后的动作，默认 translate 移动位置; ellipsis 对 text 进行省略展示 */
  action?: 'hide' | 'translate' | 'ellipsis';
}

/**
 * @ignore
 * 将 label 限制在 Plot 范围内，将超出 Plot 范围的 label 可选择进行隐藏或者移动位置
 * @param labels
 * @param cfg
 */
export function limitInPlot(
  items: LabelItem[],
  labels: IGroup[],
  shapes: IShape[] | IGroup[],
  region: BBox,
  cfg?: LimitInPlotLayoutCfg
) {
  if (labels.length <= 0) {
    return;
  }
  const direction = cfg?.direction || ['top', 'right', 'bottom', 'left'];
  const action = cfg?.action || 'translate';
  const margin = cfg?.margin || 0;
  const coordinate = labels[0].get('coordinate');
  if (!coordinate) {
    return;
  }
  const { minX: regionMinX, minY: regionMinY, maxX: regionMaxX, maxY: regionMaxY } = getCoordinateBBox(
    coordinate,
    margin
  );

  each(labels, (label: IGroup) => {
    const { minX, minY, maxX, maxY, x, y, width, height } = label.getCanvasBBox();

    let finalX = x;
    let finalY = y;
    if (direction.indexOf('left') >= 0 && (minX < regionMinX || maxX < regionMinX)) {
      // 超出左侧
      finalX = regionMinX;
    }
    if (direction.indexOf('top') >= 0 && (minY < regionMinY || maxY < regionMinY)) {
      // 超出顶部
      finalY = regionMinY;
    }

    if (direction.indexOf('right') >= 0) {
      if (minX > regionMaxX) {
        // 整体超出右侧
        finalX = regionMaxX - width;
      } else if (maxX > regionMaxX) {
        // 超出右侧
        finalX = finalX - (maxX - regionMaxX);
      }
    }

    if (direction.indexOf('bottom') >= 0) {
      if (minY > regionMaxY) {
        // 整体超出底部
        finalY = regionMaxY - height;
      } else if (maxY > regionMaxY) {
        // 超出底部
        finalY = finalY - (maxY - regionMaxY);
      }
    }

    if (finalX !== x || finalY !== y) {
      const translateX = finalX - x;
      if (action === 'translate') {
        translate(label, translateX, finalY - y);
      } else if (action === 'ellipsis') {
        const textShapes = label.findAll((shape) => shape.get('type') === 'text');
        textShapes.forEach((textShape) => {
          const style = pick(textShape.attr(), ['fontSize', 'fontFamily', 'fontWeight', 'fontStyle', 'fontVariant']);
          const textBox = textShape.getCanvasBBox();
          const text = getEllipsisText(textShape.attr('text'), textBox.width - Math.abs(translateX), style);
          textShape.attr('text', text);
        });
      } else {
        label.hide();
      }
    }
  });
}
