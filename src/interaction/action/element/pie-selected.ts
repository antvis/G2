import { transform } from '@antv/matrix-util';
import Element from '../../../geometry/element/';
import { getAngle } from '../../../util/graphics';
import SingleSelected from './single-selected';
class PieSelected extends SingleSelected {
  // 动画的配置项，可以直接从 element 上取
  private animateCfg = {
    duration: 300,
  };
  // 选中时的偏移量
  private offsetR: number = 7.5;

  /**
   * 复写选中时的状态设置，支持动画
   * @param element 动画的元素
   * @param selected 是否选中
   */
  protected setElementState(element: Element, selected: boolean) {
    element.setState('selected', selected);
    const shape = element.shape;
    if (selected) {
      const coord = this.context.view.getCoordinate();
      const { startAngle, endAngle } = getAngle(element.getModel(), coord);
      const middleAngle = (startAngle + endAngle) / 2;
      const r = this.offsetR;
      const x = r * Math.cos(middleAngle);
      const y = r * Math.sin(middleAngle);
      const matrix = transform(null, [['t', x, y]]);
      if (element.animate) {
        shape.animate({ matrix }, this.animateCfg);
      } else {
        shape.attr('matrix', matrix);
      }
    } else {
      if (element.animate) {
        shape.animate(
          {
            matrix: null,
          },
          this.animateCfg
        );
      } else {
        shape.resetMatrix();
      }
    }
  }
}

export default PieSelected;
