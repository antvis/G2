import Action from '../base';
import { getCurrentElement, getElementValue, getElementsByField } from '../util';
import Element from '../../../geometry/element/';
import { each } from '@antv/util';
import { LooseObject } from '../../../interface';
import { IGroup } from '../../../dependents';

/**
 * Link Elements by color
 * @ignore
 */
class LinkByColor extends Action {
  private linkGroup: IGroup;
  private cache: LooseObject = {};
  // 获取颜色对应的 scale
  private getColorScale(view, element) {
    const colorAttr = element.geometry.getAttribute('color');
    if (!colorAttr) {
      return null;
    }
    const scale = view.getScaleByField(colorAttr.getFields()[0]);
    return scale;
  }
  // 获取连接的 path
  private getLinkPath(element: Element, nextElement: Element) {
    const view = this.context.view;
    const { isTransposed } = view.getCoordinate();
    const bbox = element.shape.getCanvasBBox();
    const nextBBox = nextElement.shape.getCanvasBBox();
    const path = isTransposed
      ? [
          ['M', bbox.minX, bbox.minY],
          ['L', nextBBox.minX, nextBBox.maxY],
          ['L', nextBBox.maxX, nextBBox.maxY],
          ['L', bbox.maxX, bbox.minY],
          ['Z'],
        ]
      : [
          ['M', bbox.maxX, bbox.minY],
          ['L', nextBBox.minX, nextBBox.minY],
          ['L', nextBBox.minX, nextBBox.maxY],
          ['L', bbox.maxX, bbox.maxY],
          ['Z'],
        ];
    return path;
  }
  // 添加连接的图形
  private addLinkShape(group, element: Element, nextElement: Element) {
    group.addShape({
      type: 'path',
      attrs: {
        opacity: 0.4,
        fill: element.shape.attr('fill'),
        path: this.getLinkPath(element, nextElement),
      },
    });
  }
  // 使用图形连接
  private linkByElement(element: Element) {
    const view = this.context.view;
    const scale = this.getColorScale(view, element);
    if (!scale) {
      return;
    }
    const value = getElementValue(element, scale.field);
    if (!this.cache[value]) {
      const elements = getElementsByField(view, scale.field, value);
      const linkGroup = this.linkGroup;
      const group = linkGroup.addGroup();
      this.cache[value] = group; // 缓存
      const count = elements.length;
      each(elements, (el, index) => {
        if (index < count - 1) {
          const nextEl = elements[index + 1];
          this.addLinkShape(group, el, nextEl);
        }
      });
    }
  }
  // 移除连接
  private removeLink(element) {
    const scale = this.getColorScale(this.context.view, element);
    if (!scale) {
      return;
    }
    const value = getElementValue(element, scale.field);
    if (this.cache[value]) {
      this.cache[value].remove();
      this.cache[value] = null;
    }
  }

  /**
   * 连接 elements
   */
  public link() {
    const context = this.context;
    if (!this.linkGroup) {
      // 不允许被拾取
      this.linkGroup = context.view.foregroundGroup.addGroup({
        capture: false,
      });
    }
    const element = getCurrentElement(context);
    if (element) {
      this.linkByElement(element);
    }
  }

  /**
   * 取消连接 elements
   */
  unlink() {
    const element = getCurrentElement(this.context);
    if (element) {
      this.removeLink(element);
    }
  }

  /**
   * 清除所有连接
   */
  clear() {
    if (this.linkGroup) {
      this.linkGroup.clear();
    }
    this.cache = {};
  }

  /**
   * 销毁
   */
  destroy() {
    super.destroy();
    if (this.linkGroup) {
      this.linkGroup.remove();
    }
  }
}
export default LinkByColor;
