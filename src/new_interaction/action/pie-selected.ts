import { transform } from '@antv/matrix-util';
import Element from '../../geometry/element/';
import { getAngle } from '../../util/graphics';
import ElementSelected from './element-selected';
class PieSelected extends ElementSelected {
  // 动画的配置项，可以直接从 element 上取
  private animateCfg = {
    duration: 300,
  };
  // 选中时的偏移量
  private offsetR: number = 7.5;

  /**
   * 饼图选中、取消时的动画
   * @param element 动画的元素
   * @param selected 是否选中
   */
  protected setSelected(element: Element, selected: boolean) {
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
